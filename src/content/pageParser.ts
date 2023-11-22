import { VerifyPayload } from './Payload';
import { WatermarkingTools } from '../TOW/src/watermarkingTools';

interface WMParagraph {
	id: string;
	openTag: Element | undefined;
	subTags: WMSubParagraph[] | undefined;
	watermark: WatermarkInfo | undefined;
}

interface WMSubParagraph {
	id: string;
	openTag: Element | undefined;
}

interface WatermarkInfo {
	author: string;
	document: string;
	verificationStatus: VerificationStatus;
}

enum Status {
	EMPTY,
	VALIDATED,
	SHOWING
}

enum VerificationStatus {
	VALID,
	INVALID,
	UNKNOWN
}

let wmParagraphs: WMParagraph[] = [];
let status: Status = Status.EMPTY;

/**
 * Entrypoint for the page parser, called by onClicked event in background.ts
 */
export function toggleReader() {
	// Check if meta tag exists
	let meta = document.head.getElementsByTagName('watermarking-meta')[0];

	// If meta tag exists, check and update status
	if (!meta) {
		meta = document.createElement('watermarking-meta');
		document.head.appendChild(meta);
		const style = document.createElement('style');
		document.head.appendChild(style);
		style.innerHTML = `
			.wm-valid {
				background-color: #cefad0;
				color: black;
			}

			.wm-invalid {
				background-color: #ffc8c9;
				color: black;
			}

			p {
				background-color: inherit;
				color: inherit;
			}
		`;
	}

	switch (status) {
		case Status.VALIDATED:
			showWatermarking();
			status = Status.SHOWING;
			break;
		case Status.SHOWING:
			hideWatermarking();
			status = Status.VALIDATED;
			break;
		default:
			// Page has not been parsed yet

			// Add tags to the page
			parsePage();
			// Parse tags and populate wmParagraphs
			populateParagraphList();
			// Verify watermarking in each tag
			verifyWatermarking();
			// Update timestamp in meta tag
			updateTimestamp(meta);
			// Show watermarking
			showWatermarking();
			status = Status.SHOWING;
			break;
	}
}

/**
 * Updates the timestamp in the meta tag
 * @param meta The meta tag to update
 */
function updateTimestamp(meta: Element) {
	const ts = meta.getElementsByTagName('timestamp');
	if (ts.length > 0) {
		ts[0].textContent = new Date().toISOString();
	} else {
		const stat = document.createElement('timestamp');
		stat.textContent = new Date().toISOString();
		meta.appendChild(stat);
	}
}

/**
 * Parses the page and adds watermarking tags
 */
function parsePage() {
	const body = document.body.innerHTML;

	// This will contain the new body with watermarking tags
	let newBody = '';

	// Index of last character added to newBody
	let lastIndex = 0;

	// Index of watermarking tag
	let wmIndex = 0;

	// Non Printable Character used to separate paragraphs
	const NPC = '§';

	// Find first NPC in body
	let beginIndex = body.indexOf(NPC);
	while (beginIndex !== -1) {
		// Find closing NPC
		const endIndex = body.indexOf(NPC, beginIndex + 1);

		// If no closing NPC is found, break
		if (endIndex === -1) break;

		// Save everything new preceding NPC in newBody
		newBody += body.substring(lastIndex, beginIndex);

		// Update lastIndex to current end index
		lastIndex = endIndex + 1;

		// Parse string between NPC and add to newBody
		const tmp = body.substring(beginIndex, endIndex + 1);
		newBody += parseString(tmp, wmIndex);

		// Increment wmIndex
		wmIndex += 1;

		// Find next opening NPC
		beginIndex = body.indexOf(NPC, endIndex + 1);
	}

	// Add everything after last NPC to newBody
	newBody += body.substring(lastIndex, body.length);

	// Replace body with newBody
	document.body.innerHTML = newBody;
}

/**
 * Parses a string and adds watermarking tags. if string contains multiple paragraphs, it will be split and parsed
 * @param paragraph The string to parse
 * @param wmIndex The index of the watermarking tag
 * @returns The parsed string
 */
export function parseString(paragraph: string, wmIndex: number): string {
	// Create new paragraph object and add it to wmParagraphs
	const parStruct: WMParagraph = {
		id: 'watermark-' + wmIndex + '-0',
		openTag: undefined,
		subTags: undefined,
		watermark: undefined
	};
	wmParagraphs.push(parStruct);

	// Index of the last subparagraph added to newString
	let subParIndex = 1;
	let newString = '';
	/*
		Idea: Count HTML opening and closing tags in paragraph, if they are equal than no need for parsing (with some exceptions).
		Opening tag regex: <[^/][^>]*(?<!\/)>
		Closing tag regex: <\/[^>]+>

		Exceptions: 
		- If we find a closing tag before the first opening tag, counting is useless (example: ... </p> ... <p> ... </p> ... <p> ... this is balanced but should be escaped anyway)
		- If we find an opening tag after the last closing tag
	*/

	const openingTagRegex = /<[^/][^>]*(?<!\/)>/g;
	const closingTagRegex = /<\/[^>]+>/g;

	// Count opening and closing tags
	const openingTags = paragraph.match(openingTagRegex);
	const closingTags = paragraph.match(closingTagRegex);

	const openingTagsLength = openingTags ? openingTags.length : 0;
	const closingTagsLength = closingTags ? closingTags.length : 0;

	if (openingTagsLength === closingTagsLength) {
		// Need to check exceptions

		if (openingTags && closingTags) {
			// Get index of first opening tag and first closing tag
			const firstOpeningTag = paragraph.indexOf(openingTags[0]);
			const firstClosingTag = paragraph.indexOf(closingTags[0]);

			let lastIndex = 0;

			if (firstOpeningTag > firstClosingTag) {
				// First closing tag is before first opening tag, need to wrap closing tag

				// Add everything before first closing tag to newString
				newString = paragraph.substring(0, firstClosingTag);

				// Add closing tag to newString
				newString += '</wm>';

				// Add actual tag to newString
				newString += closingTags[0];

				// Add opening tag to newString
				newString +=
					'<wm class="watermark-marktag" id="watermark-' +
					wmIndex +
					'-' +
					subParIndex +
					'">';

				// Create new subParagraph object and add it to current paragraph
				const subParStruct: WMSubParagraph = {
					id: 'watermark-' + wmIndex + '-' + subParIndex,
					openTag: undefined
				};
				if (parStruct.subTags) {
					parStruct.subTags.push(subParStruct);
				} else {
					parStruct.subTags = [subParStruct];
				}

				// Increase subParIndex
				subParIndex += 1;

				// Update lastIndex to current index
				lastIndex = firstClosingTag + closingTags[0].length;
			}

			// Get index of last opening tag and last closing tag
			const lastOpeningTag = paragraph.lastIndexOf(
				openingTags[openingTagsLength - 1]
			);
			const lastClosingTag = paragraph.lastIndexOf(
				closingTags[closingTagsLength - 1]
			);

			if (lastOpeningTag > lastClosingTag) {
				// Last opening tag is after last closing tag, need to wrap opening tag

				// Add everything after last tag end before last opening tag to newString
				newString += paragraph.substring(lastIndex, lastOpeningTag);

				// Add closing tag to newString
				newString += '</wm>';

				// Add actual tag to newString
				newString += openingTags[openingTagsLength - 1];

				// Add opening tag to newString
				newString +=
					'<wm class="watermark-marktag" id="watermark-' +
					wmIndex +
					'-' +
					subParIndex +
					'">';

				// Create new subParagraph object and add it to current paragraph
				const subParStruct: WMSubParagraph = {
					id: 'watermark-' + wmIndex + '-' + subParIndex,
					openTag: undefined
				};
				if (parStruct.subTags) {
					parStruct.subTags.push(subParStruct);
				} else {
					parStruct.subTags = [subParStruct];
				}

				// Increase subParIndex
				subParIndex += 1;

				// Update lastIndex to current index
				lastIndex =
					lastOpeningTag + openingTags[openingTagsLength - 1].length;
			}

			// Add everything after last tag end to newString
			newString += paragraph.substring(lastIndex, paragraph.length);
		} else {
			newString += paragraph;
		}
	} else {
		// Paragraph contains subparagraphs with at least one unbalanced tag

		const difference = Math.abs(openingTagsLength - closingTagsLength);
		let lastIndex: number;

		if (openingTagsLength > closingTagsLength) {
			// Paragraph contains more opening tags than closing tags
			lastIndex = 0;

			// Find "difference" opening tags and wrap them with mark tags
			for (let i = 0; i < difference; i += 1) {
				// Find next opening tag and get index of beginning and end of tag
				const beginIndex = paragraph.indexOf('<', lastIndex);
				const endIndex = paragraph.indexOf('>', lastIndex);

				// Save everything preceding opening tag in newString
				newString += paragraph.substring(lastIndex, beginIndex);

				// Add opening tag to newString
				newString +=
					'<wm class="watermark-marktag" id="watermark-' +
					wmIndex +
					'-' +
					subParIndex +
					'">';

				// Create new subParagraph object and add it to current paragraph
				const subParStruct: WMSubParagraph = {
					id: 'watermark-' + wmIndex + '-' + subParIndex,
					openTag: undefined
				};
				if (parStruct.subTags) {
					parStruct.subTags.push(subParStruct);
				} else {
					parStruct.subTags = [subParStruct];
				}

				// Increase subParIndex
				subParIndex += 1;

				// Add actual tag to newString
				newString += paragraph.substring(beginIndex, endIndex + 1);

				// Add closing tag to newString
				newString += '</wm>';

				// Increase lastIndex to current index
				lastIndex = endIndex + 1;
			}

			// Add everything after last opening tag to newString
			newString += paragraph.substring(lastIndex, paragraph.length);
		} else {
			// Paragraph contains more closing tags than opening tags
			lastIndex = paragraph.length;

			// Find "difference" closing tags and wrap them with mark tags
			for (let i = 0; i < difference; i += 1) {
				// Find previous closing tag and get index of beginning and end of tag
				const beginIndex = paragraph.lastIndexOf('<', lastIndex);
				const endIndex = paragraph.lastIndexOf('>', lastIndex);

				// Save everything after closing tag in newString
				newString =
					paragraph.substring(endIndex + 1, lastIndex) + newString;

				// Add opening tag to newString
				newString =
					'<wm class="watermark-marktag" id="watermark-' +
					wmIndex +
					'-' +
					subParIndex +
					'">' +
					newString;

				// Create new subParagraph object and add it to current paragraph
				const subParStruct: WMSubParagraph = {
					id: 'watermark-' + wmIndex + '-' + subParIndex,
					openTag: undefined
				};
				if (parStruct.subTags) {
					parStruct.subTags.push(subParStruct);
				} else {
					parStruct.subTags = [subParStruct];
				}

				// Increase subParIndex
				subParIndex += 1;

				// Add actual tag to newString
				newString =
					paragraph.substring(beginIndex, endIndex + 1) + newString;

				// Add closing tag to newString
				newString = '</wm>' + newString;

				// Increase lastIndex to current index
				lastIndex = beginIndex;
			}

			// Add everything before first closing tag to newString
			newString = paragraph.substring(0, lastIndex) + newString;
		}
	}

	// Add external marks
	// Add opening tag to newString
	newString =
		'<wm class="watermark-marktag" id="watermark-' +
		wmIndex +
		'-0">' +
		newString;

	newString += '</wm>';
	return removeEmptyTags(newString);
}

/**
 * Removes tags with no inner body from a string
 * @param str The string to parse
 * @returns The parsed string
 */
function removeEmptyTags(str: string): string {
	// Regular expression to match mark tags that have no content
	const emptyTagRegex =
		/<wm[^<]*id="watermark-(\d+)-(\d+)"[^>]*(?<!\/)>[\s\n\t\t]*<\/wm>/;

	// Find all empty tags
	let emptyTag = str.match(emptyTagRegex);

	// Remove empty opening tags
	while (emptyTag) {
		const [fullMatch, wmIndex, subParIndex] = emptyTag;

		// Delete empty tag from WMParagraphs
		if (subParIndex === '0') {
			// Delete entire paragraph
			wmParagraphs = wmParagraphs.filter(
				(el) => el.id !== `watermark-${wmIndex}-0`
			);
		} else {
			// Delete sub paragraph
			wmParagraphs = wmParagraphs.map((el) => {
				if (el.id !== `watermark-${wmIndex}-0`) return el;
				else {
					return {
						...el,
						subTags: el.subTags?.filter(
							(subEl) =>
								subEl.id !==
								`watermark-${wmIndex}-${subParIndex}`
						)
					};
				}
			});
		}

		// Delete empty tag
		str = str.replace(fullMatch, '');
		emptyTag = str.match(emptyTagRegex);
	}

	return str;
}

/**
 * Scan the HTML body and look for watermarking tags, then populate the wmParagraphs array
 */
function populateParagraphList() {
	// Get all watermarking tags
	const markTags = document.getElementsByClassName('watermark-marktag');

	// Get all watermarking tags with id
	const markTagsWithId = Array.from(markTags).filter(
		(el) => el.id !== undefined
	);

	// Save last paragraph to add sub paragraphs to
	let lastParagraph: WMParagraph | undefined;
	markTagsWithId.forEach((el) => {
		// Get id of tag
		const id = el.id;

		// Get index of sub paragraph
		const subParIndex = parseInt(
			id.substring(id.lastIndexOf('-') + 1, id.length)
		);

		if (subParIndex === 0) {
			// This is a paragraph tag, create new paragraph object, add it to wmParagraphs and save it to lastParagraph
			const tmp: WMParagraph = {
				id: id,
				openTag: el,
				subTags: undefined,
				watermark: undefined
			};
			wmParagraphs.push(tmp);
			lastParagraph = tmp;
		} else {
			// This is a sub paragraph tag, create new sub paragraph object and add it to lastParagraph's subTags
			const tmp: WMSubParagraph = {
				id: id,
				openTag: el
			};
			if (lastParagraph) {
				if (lastParagraph.subTags) {
					lastParagraph.subTags.push(tmp);
				} else {
					lastParagraph.subTags = [tmp];
				}
			} else {
				console.error('No paragraph found for sub paragraph', id);
			}
		}
	});
}

function verifyWatermarking() {
	wmParagraphs.forEach(async (el) => {
		if (el.openTag) {
			// Get text of paragraph
			let fullText: string = el.openTag.textContent ?? '';

			// Get text of sub paragraphs
			el.subTags?.forEach((subEl) => {
				fullText += subEl.openTag?.textContent ?? '';
			});

			// Extract payload from text
			// Get the binary payload
			const payload = WatermarkingTools.decodeText(fullText).payload;

			// Decode and verify payload locally
			let verificationStatus = VerificationStatus.UNKNOWN;
			const payloadVerification = await VerifyPayload(payload);
			console.log(payloadVerification);

			if (payloadVerification.valid)
				verificationStatus = VerificationStatus.VALID;
			else verificationStatus = VerificationStatus.INVALID;

			// Verify payload on blockchain
			// TODO

			// Update status
			el.watermark = {
				author: payloadVerification.author ?? 'Unknown Author',
				document: payloadVerification.document ?? 'Unknown Document',
				verificationStatus: verificationStatus
			};
		}
	});
}

function hideWatermarking() {
	wmParagraphs.forEach((el) => {
		el.openTag?.classList.remove('wm-marked');
		el.openTag?.classList.remove('wm-valid');
		el.openTag?.classList.remove('wm-invalid');
		el.subTags?.forEach((subEl) => {
			subEl.openTag?.classList.remove('wm-marked');
			subEl.openTag?.classList.remove('wm-valid');
			subEl.openTag?.classList.remove('wm-invalid');
		});
	});
}

function showWatermarking() {
	wmParagraphs.forEach((el) => {
		if (el.watermark) {
			if (
				el.watermark.verificationStatus !== VerificationStatus.UNKNOWN
			) {
				const className =
					el.watermark.verificationStatus === VerificationStatus.VALID
						? 'wm-valid'
						: 'wm-invalid';
				el.openTag?.classList.add(className);
				el.subTags?.forEach((subEl) => {
					subEl.openTag?.classList.add(className);
				});
			}
		}
	});
}
