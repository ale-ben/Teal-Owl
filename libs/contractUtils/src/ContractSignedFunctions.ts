import { Config, writeContract } from '@wagmi/core';
import { defaultWagmiConfig } from '@web3modal/wagmi/react';
import { getContractInfo, viemChains } from './ContractInfo';

let wagmiSignedConfig: Config | undefined = undefined;

// Get projectId at https://cloud.walletconnect.com
const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID;
if (!projectId) throw new Error('NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID not set');

/**
 * Returns the wagmi signed config. This is a singleton.
 * This is a config for Wagmi that requires a wallet and allows read and write operations.
 * This should be preferred when possible since public config might be subject to traffic limitations due to public apis being used to access the chain.
 * @returns The wagmi signed config
 */
export function getWagmiSignedConfig(): Config {
	if (wagmiSignedConfig) return wagmiSignedConfig;

	// 2. Create wagmiConfig
	const metadata = {
		name: 'Teal Owl',
		description: 'Teal Owl Publisher',
		icons: [
			'static/icons/favicon.ico',
			'static/icons/icon16x16.png',
			'static/icons/icon32x32.png',
			'static/icons/apple-icon.png'
		]
	};

	if (!projectId)
		throw new Error('NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID not set');

	wagmiSignedConfig = defaultWagmiConfig({
		chains: viemChains,
		projectId,
		metadata
	});
	return wagmiSignedConfig;
}

/**
 * Returns the ID of the project used to create the wagmi config
 * @returns The projectId used to create the wagmi config
 */
export function getProjectID() {
	if (!projectId)
		throw new Error('NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID not set');
	return projectId;
}

/**
 * Saves the manifest to the chain
 * @param author The author of the document
 * @param document The document ID
 * @param uri The IPFS URI of the manifest
 * @param config The config to use. Defaults to the wagmi signed config
 * @returns True if the manifest was saved successfully, false otherwise
 */
export async function saveManifest(
	author: string,
	document: string,
	uri: string,
	config?: Config
): Promise<boolean> {
	const manifestID = author + document;

	const contractInfo = await getContractInfo('sepolia');
	if (contractInfo === undefined) {
		throw new Error('Contract info not found');
	}

	try {
		const res = await writeContract(config ?? getWagmiSignedConfig(), {
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
