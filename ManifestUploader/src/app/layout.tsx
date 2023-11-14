import type { Metadata } from 'next';
import './globals.css';
import { Providers } from './providers';
import TONavbar from './component/navbar';

export const metadata: Metadata = {
	title: 'Create Next App',
	description: 'Generated by create next app'
};

export default function RootLayout({
	children
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" className="light">
			<body>
				<Providers>
					< TONavbar />
					{children}
				</Providers>
			</body>
		</html>
	);
}
