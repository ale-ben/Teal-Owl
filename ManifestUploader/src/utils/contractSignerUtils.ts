import { getContractInfo } from '@/models/ContractConnectionModel';
import { writeContract } from 'wagmi/actions';

const { address, abi } = getContractInfo('sepolia');

export async function saveManifestInfo(
	author: string,
	document: string,
	uri: string
): Promise<boolean> {
	const manifestID = author + document;
	try {
		const res = await writeContract({
			address: address,
			abi: abi,
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
