'use client';

import { createWeb3Modal } from '@web3modal/wagmi/react';

import {
	getChains,
	getProjectID,
	getWagmiConfig
} from '@/utils/contractSignerUtils';
import { WagmiProvider } from 'wagmi';

// 3. Create modal
const wagmiConfig = getWagmiConfig();
const projectId = getProjectID();
const chains = getChains();
createWeb3Modal({ wagmiConfig, projectId, chains });

export function Web3Modal({ children }: { children: React.ReactNode }) {
	return <WagmiProvider config={wagmiConfig}>{children}</WagmiProvider>;
}
