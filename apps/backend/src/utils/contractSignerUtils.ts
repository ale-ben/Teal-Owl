import { getContractInfo } from '@teal-owl/contract-utils';
import { writeContract } from 'wagmi/actions';

export async function saveManifestInfo(
	author: string,
	document: string,
	uri: string
): Promise<boolean> {
	const manifestID = author + document;

	const contractInfo = await getContractInfo('sepolia');
	if (contractInfo === undefined) {
		throw new Error('Contract info not found');
	}

	try {
		const res = await writeContract({
			address: contractInfo.address,
			abi: contractInfo.abi,
			functionName: 'safeMint',
			args: [manifestID, uri]
		});
		console.log(res);
		return true;
	} catch (e) {
		console.error(e);
		return false;
	}
}
