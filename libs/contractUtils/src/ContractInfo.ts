import { Abi, Chain, Narrow } from 'viem';
import { sepolia } from '@wagmi/core/chains';

interface ContractInfo {
	address: `0x${string}`;
	abi: Narrow<readonly unknown[] | Abi>;
}

const availableChains: { [key: string]: string } = {
	sepolia: 'chain-11155111',
	localhost: 'chain-1337'
};

const baseURL =
	'https://raw.githubusercontent.com/ale-ben/Teal-Owl/develop/libs/contract/ignition/deployments/';
const addressEndpoint = '/deployed_addresses.json';
const abiEndpoint = '/artifacts/TealOwlDeploy%23TealOwl.json';

const contractList: {
	[chain: string]: ContractInfo;
} = {};

//Type is weird but createConfig is not happy with Chain[]. Only reason I found is that readonly [Chain, ...Chain[]] does not allow for an empty array
export const viemChains: [Chain, ...Chain[]] = [sepolia]; 

async function fetchContractInfo(chainName: string) {
	if (!(chainName in availableChains)) {
		throw new Error(`Chain ${chainName} not supported`);
	}
	const chainID = availableChains[chainName];
	const addressURL = baseURL + chainID + addressEndpoint;
	const abiURL = baseURL + chainID + abiEndpoint;

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

/**
 * Returns the contract info for the given chain
 * @param chain The chain name
 * @returns The contract info for the given chain or undefined if the chain is not supported
 */
export async function getContractInfo(
	chain: string
): Promise<ContractInfo | undefined> {
	if (!(chain in contractList)) {
		await fetchContractInfo(chain);
	}

	return contractList[chain];
}
