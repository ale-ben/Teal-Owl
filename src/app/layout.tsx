import type { Metadata } from 'next';
import TONavbar from './components/navbar';
import './globals.css';
import { Providers } from './providers';

export const metadata: Metadata = {
	title: 'Teal Owl',
	description: 'Manifest Uploader for Teal Owl Project'
};

export default function RootLayout({
	children
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" className="dark" suppressHydrationWarning>
			<head>
				<link rel="icon" href="/icons/favicon.ico" sizes="48x48" />
				<link
					rel="icon"
					href="/icons/icon32x32.png"
					type="image/png"
					sizes="32x32"
				/>
				<link
					rel="icon"
					href="/icons/icon16x16.png"
					type="image/png"
					sizes="16x16"
				/>
				<link
					rel="apple-touch-icon"
					href="/icons/apple-icon.png"
					type="image/png"
					sizes="180x180"
				/>
			</head>
			<body>
				<Providers>
						<TONavbar />
						{children}
				</Providers>
			</body>
		</html>
	);
}
