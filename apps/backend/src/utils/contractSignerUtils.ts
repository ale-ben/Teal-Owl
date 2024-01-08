import { getContractInfo } from '@teal-owl/contract-utils';
import { defaultWagmiConfig } from '@web3modal/wagmi/react';
import { sepolia } from 'viem/chains';
import { Config } from 'wagmi';
import { writeContract } from 'wagmi/actions';

// Get projectId at https://cloud.walletconnect.com
const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID;
if (!projectId) throw new Error('NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID not set');
const chains = [sepolia];

let config: Config | undefined = undefined;

export function getWagmiConfig(): Config {
	if (config) return config;

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
	config = defaultWagmiConfig({ chains, projectId, metadata });
	return config;
}

export function getProjectID() {
	if (!projectId)
		throw new Error('NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID not set');
	return projectId;
}

export function getChains() {
	return chains;
}

