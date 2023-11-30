// app/providers.tsx
'use client';

import { localChain } from '@/models/LocalChain';
import { NextUIProvider } from '@nextui-org/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { createPublicClient, http } from 'viem';
import { WagmiConfig, createConfig } from 'wagmi';

export function Providers({ children }: { children: React.ReactNode }) {
	const config = createConfig({
		autoConnect: false,
		publicClient: createPublicClient({
			chain: localChain,
			transport: http()
		})
	});

	return (
		<NextUIProvider>
			<NextThemesProvider attribute="class">
				<WagmiConfig config={config}>{children}</WagmiConfig>
			</NextThemesProvider>
		</NextUIProvider>
	);
}
