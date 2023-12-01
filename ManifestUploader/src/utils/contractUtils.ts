import { readContract } from 'wagmi/actions';
import contract_info from '../static/contractInfo/TealOwlDeploy#TealOwl.json';
import contract_address from '../static/contractInfo/deployed_addresses.json';

const deployAddress = contract_address[
	'TealOwlDeploy#TealOwl'
] as `0x${string}`;

const abi = contract_info.abi;

export function getName(): Promise<string | undefined> {
	return readContract({
		address: deployAddress,
		abi: abi,
		functionName: 'name'
	}).then((data) => {
		if (typeof data === 'string') return data;
		else return undefined;
	});
}
