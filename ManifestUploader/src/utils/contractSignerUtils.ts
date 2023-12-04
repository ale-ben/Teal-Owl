import { readContract, writeContract } from 'wagmi/actions';
import contract_info from '../static/contractInfo/localhost/TealOwlDeploy#TealOwl.json';
import contract_address from '../static/contractInfo/localhost/deployed_addresses.json';

const deployAddress = contract_address[
	'TealOwlDeploy#TealOwl'
] as `0x${string}`;

const abi = contract_info.abi;

export function saveManifestInfo(
	author: string,
	document: string,
	uri: string
): Promise<boolean> {
	const manifestID = author + document;
	return writeContract({
		address: deployAddress,
		abi: abi,
		functionName: 'safeMint',
		args: [manifestID, uri]
	})
		.then((res) => {
			console.log(res);
			return true;
		})
		.catch((e) => {
			console.error(e);
			return false;
		});
}
