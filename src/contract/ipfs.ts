import { ThirdwebStorage } from '@thirdweb-dev/storage';
import { ManifestModel, isManifestModel } from './ManifestModel';

const storage = new ThirdwebStorage();

export interface IPFSObject {
	cid: string | undefined;
	name?: string;
	content: ManifestModel;
}

export async function downloadManifestFromIPFS(
	cid: string
): Promise<ManifestModel | undefined> {
	// Add ipfs:// if it's not there
	if (!cid.startsWith('ipfs://')) cid = 'ipfs://' + cid;

	try {
		// Download the object
		const obj = await storage.downloadJSON(cid);

		// Validate the object
		if (!isManifestModel(obj)) {
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
