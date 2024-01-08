'use server';

import { getContractInfo } from '@teal-owl/contract-utils';
import { createConfig, readContract, http } from '@wagmi/core';
import { sepolia } from '@wagmi/core/chains';
import { z } from 'zod';

const config = createConfig({
	chains: [sepolia],
	transports: {
		[sepolia.id]: http()
	}
});

export async function getName(): Promise<string | undefined> {
	const contractInfo = await getContractInfo('sepolia');
	if (contractInfo === undefined) {
		throw new Error('Contract info not found');
	}

	const name = await readContract(config, {
		address: contractInfo.address,
		abi: contractInfo.abi,
		functionName: 'name'
	});
	return name as string;
}

export async function getTokenURI(
	tokenId: string
): Promise<string | undefined> {
	const contractInfo = await getContractInfo('sepolia');
	if (contractInfo === undefined) {
		throw new Error('Contract info not found');
	}

	const tokenURI = await readContract(config, {
		address: contractInfo.address,
		abi: contractInfo.abi,
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
