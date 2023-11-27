// app/providers.tsx
'use client';

import { MetaMaskContext } from '@/models/MetaMaskContext';
import { NextUIProvider } from '@nextui-org/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { useMemo, useState } from 'react';

export function Providers({ children }: { children: React.ReactNode }) {
	const [address, setAddress] = useState<string | undefined>(undefined);
	const value = useMemo(() => ({ address, setAddress, onAddressChange: setAddress }), [address]);

	return (
		<NextUIProvider>
			<NextThemesProvider attribute="class">
				<MetaMaskContext.Provider value={value}>
					{children}
				</MetaMaskContext.Provider>
			</NextThemesProvider>
		</NextUIProvider>
	);
}
