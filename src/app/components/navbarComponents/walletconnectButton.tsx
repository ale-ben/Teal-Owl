'use client';

import { usePathname } from 'next/navigation';

export default function WalletConnectButton() {
	const path = usePathname();

	if (path === '/upload') return <w3m-button />;
	else return <></>;
}
