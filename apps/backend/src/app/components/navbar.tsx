import {
	Navbar,
	NavbarBrand,
	NavbarContent,
	NavbarItem
} from '@nextui-org/navbar';
import Link from 'next/link';
import DarkModeToggle from './navbarComponents/darkModeToggle';
import NavbarButton from './navbarComponents/navbarButton';
import WalletConnectButton from './navbarComponents/walletconnectButton';

export default function TONavbar() {
	return (
		<Navbar isBordered maxWidth="full">
			<NavbarBrand>
				<Link href="/">
					<p className="font-bold text-inherit">Teal Owl</p>
				</Link>
			</NavbarBrand>
			<NavbarContent className="hidden gap-4 sm:flex" justify="center">
				<NavbarButton href="/upload" text="Upload Manifest" />
				<NavbarButton href="/retrieve" text="Retrieve Manifest" />
			</NavbarContent>
			<NavbarContent justify="end">
				<NavbarItem>
					<WalletConnectButton />
				</NavbarItem>
				<NavbarItem>
					<DarkModeToggle />
				</NavbarItem>
			</NavbarContent>
		</Navbar>
	);
}
