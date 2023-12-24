import { getThirdwebAuthClient } from './baseStorage';
import { IPFSObject } from './types';

export async function uploadManifestToIPFS(
	obj: IPFSObject,
	thirdwebKey?: string
): Promise<IPFSObject> {
	const client = getThirdwebAuthClient(thirdwebKey);
	const uri = await client.upload(obj.content, {
		alwaysUpload: false
	});
	const cid = uri.replace('ipfs://', '');
	return { ...obj, cid: cid };
}
