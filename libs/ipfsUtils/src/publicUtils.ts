import { isManifestType, ManifestType } from '@teal-owl/types';
import { getThirdwebBaseClient } from './baseStorage';

export async function downloadManifestFromIPFS(
	cid: string
): Promise<ManifestType | undefined> {
	// Add ipfs:// if it's not there
	if (!cid.startsWith('ipfs://')) cid = 'ipfs://' + cid;

	try {
		// Get the base client
		const baseStorage = getThirdwebBaseClient();
		// Download the object
		const obj = await baseStorage.downloadJSON(cid);

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
