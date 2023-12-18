import { ThirdwebStorage } from '@thirdweb-dev/storage';
import { IPFSObject } from './types';

const authStorage = new ThirdwebStorage({
	secretKey: process.env.THIRDWEB_API_KEY
});

export async function uploadManifestToIPFS(
	obj: IPFSObject
): Promise<IPFSObject> {
	const uri = await authStorage.upload(obj.content, {
		alwaysUpload: false
	});
	const cid = uri.replace('ipfs://', '');
	return { ...obj, cid: cid };
}
