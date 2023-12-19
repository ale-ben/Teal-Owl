import { downloadManifestFromIPFS } from '@teal-owl/ipfs-utils';
import { decodeText, extractRawText } from '@teal-owl/watermarking';
import { sha256 } from 'js-sha256';
import { getTokenURI } from '../contract/contractUtils';
import {
	VerificationStatus,
	WMParagraph,
	WatermarkInfo
} from '../models/parserTypes';
import { VerifyPayload } from './Payload';

/**
 * Converts an HTML string into a plain text string by removing all tags.
 * @param html The HTML string to be converted
 * @returns The plain text string
 */
export function HTMLToText(html: string): string {
	return html.replace(/<[^>]*>?/gm, '');
}

function localValidation(wmParagraph: WMParagraph): WatermarkInfo {
	if (!wmParagraph.openTag)
		return {
			verificationStatus: VerificationStatus.INVALID,
			author: '',
			document: ''
		};

	// Get text of paragraph
	let fullText: string = wmParagraph.openTag.textContent ?? '';

	// Get text of sub paragraphs
	wmParagraph.subTags?.forEach((subEl) => {
		fullText += subEl.openTag?.textContent ?? '';
	});

	// Extract payload from text
	// Get the binary payload
	const payload = decodeText(fullText).payload;

	// Decode and verify payload locally
	const payloadVerification = VerifyPayload(payload);

	if (
		payloadVerification.valid &&
		payloadVerification.author &&
		payloadVerification.document
	)
		return {
			verificationStatus: VerificationStatus.VALID,
			author: payloadVerification.author,
			document: payloadVerification.document
		};
	else
		return {
			verificationStatus: VerificationStatus.INVALID,
			author: '',
			document: ''
		};
}

/**
 * Verify payload with smart contract.
 * This works in 3 steps:
 * 1. Get the CID from the smart contract
 * 2. Download the object from IPFS
 * 3. Verify the payload
 * @param wmParagraph The paragraph to verify
 * @param wmInfo The data from the local validation
 * @returns The verification status
 */
async function remoteValidation(
	wmParagraph: WMParagraph,
	wmInfo: WatermarkInfo
): Promise<VerificationStatus> {
	// Step 1: Get the CID from the smart contract
	const tokenURI = await getTokenURI(wmInfo.author + wmInfo.document);
	if (tokenURI === undefined) return VerificationStatus.INVALID; // TODO: There should be a third status like "I'm not sure" or something like that

	// Step 2: Download the object from IPFS
	const manifest = await downloadManifestFromIPFS(tokenURI); // TODO: Local cache would be good here
	if (manifest === undefined) return VerificationStatus.INVALID; // TODO: There should be a third status like "I'm not sure" or something like that

	// Step 3: Verify the payload
	if (
		manifest.author !== wmInfo.author ||
		manifest.document !== wmInfo.document
	) {
		console.log('Author or document does not match');
		console.log('Author', manifest.author, wmInfo.author);
		console.log('Document', manifest.document, wmInfo.document);
		return VerificationStatus.INVALID;
	}

	// Obtain the text of the paragraph
	let fullText: string = wmParagraph.openTag?.innerHTML ?? '';

	// Get text of sub paragraphs
	fullText += wmParagraph.subTags?.reduce((acc: string, subEl) => {
		return acc + (subEl.openTag?.innerHTML ?? '');
	}, '');
	if (fullText === '') return VerificationStatus.INVALID;

	// Remove all tags from the text
	fullText = HTMLToText(fullText);

	// Remove watermark from text
	fullText = extractRawText(fullText);

	// Compare paragraph hash with hash from manifest
	const hash = sha256(fullText);

	const result = manifest.hashList.find((el) => el === hash);

	if (result !== undefined && result !== '') return VerificationStatus.VALID;
	else {
		console.warn(
			'Calculated hash does not match any of the known hashes.',
			JSON.stringify({
				par: fullText,
				generated: hash,
				known: manifest.hashList
			})
		);
		return VerificationStatus.INVALID;
	}
}

export async function verifyWatermarks(wmParagraphs: WMParagraph[]) {
	wmParagraphs.forEach(async (el) => {
		if (el.openTag) {
			const localValidationResult = localValidation(el);
			let remoteValidationResult: VerificationStatus | undefined;

			if (
				localValidationResult.verificationStatus ===
					VerificationStatus.VALID &&
				localValidationResult.author !== '' &&
				localValidationResult.document !== ''
			) {
				remoteValidationResult = await remoteValidation(
					el,
					localValidationResult
				);
			}

			// Update status
			el.watermark = {
				author: localValidationResult.author ?? 'Unknown Author',
				document: localValidationResult.document ?? 'Unknown Document',
				verificationStatus:
					remoteValidationResult ?? VerificationStatus.INVALID
			};
		}
	});
}
