import { Abi, Narrow } from 'viem';

interface ContractInfo {
	address: `0x${string}`;
	abi: Narrow<readonly unknown[] | Abi>;
}

const availableChains: [string, string][] = [
	['localhost', 'chain-31337'],
	['sepolia', 'chain-11155111']
];
const baseURL =
	'https://raw.githubusercontent.com/ale-ben/Teal-Owl_Contract/develop/ignition/deployments/';
const addressEndpoint = '/deployed_addresses.json';
const abiEndpoint = '/artifacts/TealOwlDeploy%23TealOwl.json';

const contractList: {
	[chain: string]: ContractInfo;
} = {};
let initialized = 0;

availableChains.forEach(([chainName, chainID]) => {
	const addressURL = baseURL + chainID + addressEndpoint;
	const abiURL = baseURL + chainID + abiEndpoint;

	const addressResponse = fetch(addressURL);
	const abiResponse = fetch(abiURL);

	Promise.all([addressResponse, abiResponse]).then((responses) => {
		Promise.all(responses.map((response) => response.json())).then(
			([addressJSON, abiJSON]) => {
				contractList[chainName] = {
					address: addressJSON['TealOwlDeploy#TealOwl'],
					abi: abiJSON.abi
				};
				initialized++;
			}
		);
	});
});

export async function getContractInfo(chain: string): Promise<ContractInfo | undefined> {
	while (initialized !== availableChains.length) {
		await new Promise((resolve) => setTimeout(resolve, 500));
		console.log('waiting for contract info');
	}
	return contractList[chain];
}
