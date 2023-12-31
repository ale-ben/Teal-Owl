'use server';

import { redirect } from 'next/navigation';
import { z } from 'zod';
import { getTokenURI } from './contractProviderUtils';

import { downloadManifestFromIPFS } from '@teal-owl/ipfs-utils';
import { ManifestType } from '@teal-owl/types';

export async function retrieveFormSubmitHandler(formData: FormData) {
	// Validate and parse the form data to get the authorID, documentID, and manifestID
	const zStr = z.optional(z.coerce.string());

	const authorIDPromise = zStr.safeParseAsync(formData.get('authorID'));
	const documentIDPromise = zStr.safeParseAsync(formData.get('documentID'));
	const manifestIDPromise = zStr.safeParseAsync(formData.get('manifestID'));

	const [authorID, documentID, manifestID] = await Promise.all([
		authorIDPromise,
		documentIDPromise,
		manifestIDPromise
	]);

	if (!authorID.success || !documentID.success || !manifestID.success) {
		console.error('Invalid form data', {
			authorID: authorID,
			documentID: documentID,
			manifestID: manifestID,
			formData: formData
		});
		redirect('?error=invalid');
	}

	if (
		authorID.data === '' &&
		documentID.data === '' &&
		manifestID.data === ''
	) {
		console.error('All fields are empty');
		redirect('?error=allEmpty');
	}

	// If maniefestID is not empty, use that to retrieve the manifest
	if (manifestID.data && manifestID.data !== '') {
		redirect(`/retrieve/${manifestID.data}`);
	}

	if (
		documentID.data &&
		authorID.data &&
		documentID.data !== '' &&
		authorID.data !== ''
	) {
		redirect(`/retrieve/${authorID.data + documentID.data}`);
	}

	if (documentID.data === '') {
		redirect(`?error=missingDocumentID&authorID=${authorID.data}`);
	}

	if (authorID.data === '') {
		redirect(`?error=missingAuthorID&documentID=${documentID.data}`);
	}
}

export async function getManifest(
	tokenId: string
): Promise<ManifestType | undefined> {
	// Get the manifest URI from the contract
	const manifestURI = await getTokenURI(tokenId);

	if (manifestURI === undefined) return undefined;

	console.log('Manifest URI', manifestURI);

	// Fetch the manifest
	return await downloadManifestFromIPFS(manifestURI);
}
