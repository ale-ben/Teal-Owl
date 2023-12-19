'use client';

import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi/react';

import { sepolia } from 'viem/chains';
import { WagmiConfig } from 'wagmi';

// 1. Get projectId at https://cloud.walletconnect.com
const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID;

if (!projectId) throw new Error('NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID not set');

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

const chains = [sepolia];
const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata });

// 3. Create modal
createWeb3Modal({ wagmiConfig, projectId, chains });

export function Web3Modal({ children }: { children: React.ReactNode }) {
	return <WagmiConfig config={wagmiConfig}>{children}</WagmiConfig>;
}
