import type { Metadata } from 'next';
import packageInfo from '../../package.json';
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
				<p className="absolute bottom-2 right-2 text-gray-300 dark:text-gray-800">
					v{packageInfo.version}
				</p>
			</body>
		</html>
	);
}
