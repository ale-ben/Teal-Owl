import { isManifestType, ManifestType } from '@teal-owl/types';
import { ThirdwebStorage } from '@thirdweb-dev/storage';

const authStorage = new ThirdwebStorage();

export async function downloadManifestFromIPFS(
	cid: string
): Promise<ManifestType | undefined> {
	// Add ipfs:// if it's not there
	if (!cid.startsWith('ipfs://')) cid = 'ipfs://' + cid;

	try {
		// Download the object
		const obj = await authStorage.downloadJSON(cid);

		// Validate the object
		if (!isManifestType(obj)) {
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
