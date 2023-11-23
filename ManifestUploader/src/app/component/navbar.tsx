import {
	Navbar,
	NavbarBrand,
	NavbarContent,
	NavbarItem
} from '@nextui-org/navbar';
import { Button } from '@nextui-org/button';
import { Link } from '@nextui-org/link';
import MetamaskLogo from './navbarComponents/metamaskLogo';
import NavbarButton from './navbarComponents/navbarButton';
import DarkModeToggle from './navbarComponents/darkModeToggle';

export default function TONavbar() {
	return (
		<Navbar isBordered>
			<NavbarBrand>
				<p className="font-bold text-inherit">Teal Owl</p>
			</NavbarBrand>
			<NavbarContent className="hidden gap-4 sm:flex" justify="center">
				<NavbarButton href="/" text="Upload Manifest" />
				<NavbarButton href="/retrieve" text="Retrieve Manifest" />
			</NavbarContent>
			<NavbarContent justify="end">
				<NavbarItem>
					<Button
						color="primary"
						href="#"
						variant="flat"
						startContent={MetamaskLogo()}
					>
						Connect with MetaMask
					</Button>
				</NavbarItem>
				<DarkModeToggle/>
			</NavbarContent>
		</Navbar>
	);
}
