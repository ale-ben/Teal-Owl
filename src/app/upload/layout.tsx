import { Web3Modal } from '@/context/Web3Modal';

export default function UploadLayout({
	children
}: {
	children: React.ReactNode;
}) {
	return <Web3Modal>{children}</Web3Modal>;
}
