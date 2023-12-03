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

export async function uploadObjectToIPFS(obj: IPFSObject): Promise<IPFSObject> {
	const uri = await storage.upload(obj.content, {
		alwaysUpload: false
	});
	const cid = uri.replace('ipfs://', '');
	return { ...obj, cid: cid };
}

export async function downloadObjectFromIPFS(
	cid: string
): Promise<IPFSObject | undefined> {
	if (!cid.startsWith('ipfs://')) cid = 'ipfs://' + cid;
	try {
		const obj = await storage.downloadJSON(cid);
		if (!obj || !isManifestModel(obj)) {
			console.log(
				'Error while retrieving file. Object is not a valid ManifestModel.' +
					obj
			);
			return;
		}
		return { cid: cid, content: obj };
	} catch (e) {
		console.log('Error while retrieving file ' + cid, e);
		return;
	}
}
