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

	await Promise.all([addressResponse, abiResponse]).then(
		async (responses) => {
			await Promise.all(
				responses.map((response) => response.json())
			).then(([addressJSON, abiJSON]) => {
				contractList[chainName] = {
					address: addressJSON['TealOwlDeploy#TealOwl'],
					abi: abiJSON.abi
				};
			});
		}
	);
}

export async function getContractInfo(
	chain: string
): Promise<ContractInfo | undefined> {
	if (!(chain in contractList)) {
		await fetchContractInfo(chain);
	}

	return contractList[chain];
}