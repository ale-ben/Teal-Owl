//TODO: All this could be uniformed using the contract-utils package
import { getContractInfo } from '@teal-owl/contract-utils';
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

export async function getName(): Promise<string | undefined> {
	const contractInfo = await getContractInfo('sepolia');

	if (contractInfo === undefined) {
		return undefined;
	}

	const name = await readContract({
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
		return undefined;
	}

	const tokenURI = await readContract({
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
