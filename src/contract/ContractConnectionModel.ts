import { Abi, Narrow } from 'viem';

interface ContractInfo {
	address: `0x${string}`;
	abi: Narrow<readonly unknown[] | Abi>;
}

const baseURL =
	'https://github.com/ale-ben/Teal-Owl_Contract/releases/latest/download/';
const addressEndpoint = '-deployed_addresses.json';
const abiEndpoint = '-TealOwlDeploy.json';

const contractList: {
	[chain: string]: ContractInfo;
} = {};

async function fetchContractInfo(chainName: string) {
	const addressURL = baseURL + chainName + addressEndpoint;
	const abiURL = baseURL + chainName + abiEndpoint;

	const addressResponse = fetch(addressURL);
	const abiResponse = fetch(abiURL);

	Promise.all([addressResponse, abiResponse]).then((responses) => {
		Promise.all(responses.map((response) => response.json())).then(
			([addressJSON, abiJSON]) => {
				contractList[chainName] = {
					address: addressJSON['TealOwlDeploy#TealOwl'],
					abi: abiJSON.abi
				};
			}
		);
	});
}

export async function getContractInfo(
	chain: string
): Promise<ContractInfo | undefined> {
	
	if (!(chain in contractList)) {
		console.log('Fetching contract info', chain);
		await fetchContractInfo(chain);
	}

	return contractList[chain];
}


/**
 * https://github.com/ale-ben/Teal-Owl_Contract/releases/download/1.0.1/sepolia-TealOwlDeploy.json
 * https://github.com/ale-ben/Teal-Owl_Contract/releases/download/latest/sepolia-deployed_addresses.json
 * https://github.com/ale-ben/Teal-Owl_Contract/releases/download/1.0.1/sepolia-deployed_addresses.json
 */