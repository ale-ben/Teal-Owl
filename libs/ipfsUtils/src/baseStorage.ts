import { IpfsUploadBatchOptions, ThirdwebStorage } from '@thirdweb-dev/storage';

const baseStorage = new ThirdwebStorage();
let authClient: ThirdwebStorage<IpfsUploadBatchOptions> | undefined;

export function getThirdwebBaseClient() {
	return baseStorage;
}

export function getThirdwebAuthClient(key?: string) {
	if (authClient !== undefined) return authClient;
	if (key === undefined)
		throw new Error('No key provided for thirdweb auth client');
	return new ThirdwebStorage({ secretKey: key });
}
