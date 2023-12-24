'use server';

import { IPFSObject, uploadManifestToIPFS } from '@teal-owl/ipfs-utils';

const apiKey = process.env.THIRDWEB_API_KEY;

if (apiKey === undefined) {
	console.warn(
		'No THIRDWEB_API_KEY environment variable found. Skipping IPFS setup.'
	);
}

export async function uploadToIPFS(
	obj: IPFSObject
): Promise<IPFSObject | undefined> {
	if (apiKey === undefined) {
		console.warn(
			'No THIRDWEB_API_KEY environment variable found. Skipping IPFS upload.'
		);
		return undefined;
	}
	return uploadManifestToIPFS(obj, apiKey);
}
