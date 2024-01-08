import { Config, createConfig, http, readContract } from '@wagmi/core';
import { sepolia } from '@wagmi/core/chains';
import { z } from 'zod';
import { getContractInfo } from './ContractInfo';
import { createPublicClient } from 'viem';

let wagmiPublicConfig: Config | undefined = undefined;

/**
 * Returns the wagmi public config. This is a singleton.
 * This is a config for Wagmi that does not require a wallet and allows only read operations.
 * getWagmiSignedConfig should be preferred where possible since public config might be subject to traffic limitations due to public apis being used to access the chain.
 * @returns The wagmi public config
 */
export function getWagmiPublicConfig(): Config {
	console.log('Getting wagmi public config');
	if (wagmiPublicConfig) return wagmiPublicConfig;

	console.log('Creating wagmi public confierhtjykuig');
	wagmiPublicConfig = createConfig({
		chains: [sepolia],
		client({ chain }) {
			return createPublicClient({ chain, transport: http() });
		}
	});

	console.log('Created wagmi public config', wagmiPublicConfig);

	return wagmiPublicConfig;
}

/**
 * Returns the name of the contract
 * @param config The config to use. Defaults to the wagmi public config
 * @returns The name of the contract
 */
export async function getName(config?: Config): Promise<string | undefined> {
	const contractInfo = await getContractInfo('sepolia');

	if (contractInfo === undefined) {
		return undefined;
	}

	try {
		const name = await readContract(config ?? getWagmiPublicConfig(), {
			address: contractInfo.address,
			abi: contractInfo.abi,
			functionName: 'name'
		});

		const parsed = z.string().safeParse(name);
		if (
			parsed.success === false ||
			parsed.data === undefined ||
			parsed.data === ''
		) {
			return undefined;
		}

		return parsed.data;
	} catch (e) {
		console.warn('Error while fetching contract name', e);
		return undefined;
	}
}

/**
 * Returns the token URI for the given token ID
 * @param tokenId The token ID
 * @param config The config to use. Defaults to the wagmi public config
 * @returns The token URI
 */
export async function getTokenURI(
	tokenId: string,
	config?: Config
): Promise<string | undefined> {
	console.log('Getting token URI for', tokenId);
	const contractInfo = await getContractInfo('sepolia');

	console.log('Contract info', contractInfo);

	if (contractInfo === undefined) {
		return undefined;
	}
	console.log('a');
	console.log('Config', getWagmiPublicConfig());
	console.log('b');

	try {
		console.log('Config', config ?? getWagmiPublicConfig());
		const tokenURI = await readContract(config ?? getWagmiPublicConfig(), {
			address: contractInfo.address,
			abi: contractInfo.abi,
			functionName: 'tokenURIS',
			args: [tokenId]
		});

		console.log('Found tokenURI', tokenURI);

		const parsed = z.string().safeParse(tokenURI);
		if (
			parsed.success === false ||
			parsed.data === undefined ||
			parsed.data === ''
		) {
			return undefined;
		}

		return parsed.data;
	} catch (e) {
		console.warn('Error while fetching tokenURI', e);
		return undefined;
	}
}
