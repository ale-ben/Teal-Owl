'use server';

import { getContractInfo } from '@/models/ContractConnectionModel';
import { localChain } from '@/models/LocalChain';
import { configureChains, createConfig, readContract } from '@wagmi/core';
import { publicProvider } from '@wagmi/core/providers/public';

const { publicClient } = configureChains([localChain], [publicProvider()]);

createConfig({
	publicClient
});

const { address, abi } = getContractInfo('localhost');

export async function getName(): Promise<string | undefined> {
	const name = await readContract({
		address,
		abi,
		functionName: 'name'
	});
	return name as string;	
}