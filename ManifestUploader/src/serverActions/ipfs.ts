'use server';

import { ManifestModel, isManifestModel } from '@/models/ManifestModel';
import { ThirdwebStorage } from '@thirdweb-dev/storage';

const storage = new ThirdwebStorage({
	secretKey: process.env.THIRDWEB_API_KEY
});

export interface IPFSObject {
	uri: string | undefined;
	name?: string;
	content: ManifestModel;
}

export async function uploadObjectToIPFS(obj: IPFSObject): Promise<IPFSObject> {
	const uri = await storage.upload(obj.content, {
		alwaysUpload: false
	});
	return { ...obj, uri: uri };
}

export async function downloadObjectFromIPFS(
	uri: string
): Promise<IPFSObject | undefined> {
	if (!uri.startsWith('ipfs://')) uri = 'ipfs://' + uri;
	try {
		const obj = await storage.downloadJSON(uri);
		if (!obj || !isManifestModel(obj)) {
			console.log(
				'Error while retrieving file. Object is not a valid ManifestModel.' +
					obj
			);
			return;
		}
		return { uri: uri, content: obj };
	} catch (e) {
		console.log('Error while retrieving file ' + uri, e);
		return;
	}
}
