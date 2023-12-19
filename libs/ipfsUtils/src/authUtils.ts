import { authStorage } from './baseStorage';
import { IPFSObject } from './types';



export async function uploadManifestToIPFS(
	obj: IPFSObject
): Promise<IPFSObject> {
	const uri = await authStorage.upload(obj.content, {
		alwaysUpload: false
	});
	const cid = uri.replace('ipfs://', '');
	return { ...obj, cid: cid };
}
