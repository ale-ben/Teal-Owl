'use server';

import { getContractInfo } from '@/models/ContractConnectionModel';
import { localChain } from '@/models/LocalChain';
import { configureChains, createConfig, readContract } from '@wagmi/core';
import { publicProvider } from '@wagmi/core/providers/public';
import { z } from 'zod';

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

export async function getTokenURI(
	tokenId: string
): Promise<string | undefined> {
	const tokenURI = await readContract({
		address,
		abi,
		functionName: 'tokenURIS',
		args: [tokenId]
	});

	const parsed = z.string().safeParse(tokenURI);
	if (parsed.success === false || parsed.data === undefined || parsed.data === '') {
		return undefined;
	}

	return parsed.data;
}
