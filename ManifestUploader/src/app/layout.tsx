import type { Metadata } from 'next';
import './globals.css';
import { Providers } from './providers';
import TONavbar from './components/navbar';

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
			<body>
				<Providers>
					<TONavbar />
					{children}
				</Providers>
			</body>
		</html>
	);
}
