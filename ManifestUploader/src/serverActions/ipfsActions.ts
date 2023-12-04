'use server';

import { ManifestModel, isManifestModel } from '@/models/ManifestModel';
import { ThirdwebStorage } from '@thirdweb-dev/storage';

const storage = new ThirdwebStorage({
	secretKey: process.env.THIRDWEB_API_KEY
});

export interface IPFSObject {
	cid: string | undefined;
	name?: string;
	content: ManifestModel;
}

export async function uploadManifestToIPFS(
	obj: IPFSObject
): Promise<IPFSObject> {
	const uri = await storage.upload(obj.content, {
		alwaysUpload: false
	});
	const cid = uri.replace('ipfs://', '');
	return { ...obj, cid: cid };
}

export async function downloadManifestFromIPFS(
	cid: string
): Promise<ManifestModel | undefined> {
	// Add ipfs:// if it's not there
	if (!cid.startsWith('ipfs://')) cid = 'ipfs://' + cid;

	try {
		// Download the object
		const obj = await storage.downloadJSON(cid);

		// Validate the object
		if (!isManifestModel(obj)) {
			console.log(
				'Error while retrieving file. Object is not a valid ManifestModel.' +
					obj
			);
			return;
		}

		// Return the object as a ManifestModel
		return obj;
	} catch (e) {
		console.log('Error while retrieving file ' + cid, e);
		return;
	}
}
