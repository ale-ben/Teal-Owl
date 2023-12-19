import { IpfsUploadBatchOptions, ThirdwebStorage } from '@thirdweb-dev/storage';

export let authStorage: ThirdwebStorage<IpfsUploadBatchOptions>;

if (typeof process !== 'undefined' && process.env.THIRDWEB_API_KEY){
	authStorage = new ThirdwebStorage({
		secretKey: process.env.THIRDWEB_API_KEY
	});
} else {
	console.warn("No THIRDWEB_API_KEY found in environment variables. Only public queries will be available.");
	authStorage = new ThirdwebStorage();
}