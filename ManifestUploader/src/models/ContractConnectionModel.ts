import { Abi, Narrow } from 'viem';
import localhost_contract_info from '../static/contractInfo/localhost/TealOwlDeploy#TealOwl.json';
import localhost_contract_address from '../static/contractInfo/localhost/deployed_addresses.json';
import sepolia_contract_info from '../static/contractInfo/sepolia/TealOwlDeploy#TealOwl.json';
import sepolia_contract_address from '../static/contractInfo/sepolia/deployed_addresses.json';

const contractList: { [chain: string]: {
	address: `0x${string}`,
	abi: Narrow<readonly unknown[] | Abi>
} } = {
	"sepolia": {
		address: sepolia_contract_address[
			'TealOwlDeploy#TealOwl'
		] as `0x${string}`,
		abi: sepolia_contract_info.abi
	},
	"localhost": {
		address: localhost_contract_address[
			'TealOwlDeploy#TealOwl'
		] as `0x${string}`,
		abi: localhost_contract_info.abi
	}
}

export function getContractInfo(chain: string) {
	return contractList[chain];
}