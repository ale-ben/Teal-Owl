// app/providers.tsx
'use client';

import { MetaMaskUIProvider } from '@metamask/sdk-react-ui';
import { NextUIProvider } from '@nextui-org/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<NextUIProvider>
			<NextThemesProvider attribute="class">
				<MetaMaskUIProvider
					sdkOptions={{
						dappMetadata: {
							name: 'Teal Owl - Publisher'
						}
					}}
				>
					{children}
				</MetaMaskUIProvider>
			</NextThemesProvider>
		</NextUIProvider>
	);
}
