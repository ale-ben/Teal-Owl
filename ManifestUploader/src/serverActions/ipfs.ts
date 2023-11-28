'use server';

import { ThirdwebStorage } from '@thirdweb-dev/storage';

const storage = new ThirdwebStorage({
	secretKey: process.env.THIRDWEB_API_KEY
});

export interface IPFSObject {
	uri: string | undefined;
	name: string | undefined;
	content: object;
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
		return { uri: uri, content: obj, name: undefined };
	} catch (e) {
		console.log('Error while retrieving file ' + uri, e);
		return;
	}
}
