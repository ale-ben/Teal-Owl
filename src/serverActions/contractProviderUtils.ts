'use server';

import { getContractInfo } from '@/models/ContractConnectionModel';
import {
	configureChains,
	createConfig,
	readContract,
	sepolia
} from '@wagmi/core';
import { publicProvider } from '@wagmi/core/providers/public';
import { z } from 'zod';

const { publicClient } = configureChains([sepolia], [publicProvider()]); //FIXME: When changing chains, this needs to change as well

createConfig({
	publicClient
});

const { address, abi } = getContractInfo('sepolia');

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
	if (
		parsed.success === false ||
		parsed.data === undefined ||
		parsed.data === ''
	) {
		return undefined;
	}

	return parsed.data;
}
