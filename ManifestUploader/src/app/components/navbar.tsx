import {
	Navbar,
	NavbarBrand,
	NavbarContent,
	NavbarItem
} from '@nextui-org/navbar';
import DarkModeToggle from './navbarComponents/darkModeToggle';
import MetamaskComponent from './navbarComponents/metamaskComponent';
import NavbarButton from './navbarComponents/navbarButton';

export default function TONavbar() {
	return (
		<Navbar isBordered maxWidth="full">
			<NavbarBrand>
				<p className="font-bold text-inherit">Teal Owl</p>
			</NavbarBrand>
			<NavbarContent className="hidden gap-4 sm:flex" justify="center">
				<NavbarButton href="/" text="Upload Manifest" />
				<NavbarButton href="/retrieve" text="Retrieve Manifest" />
			</NavbarContent>
			<NavbarContent justify="end">
				<NavbarItem>
					<MetamaskComponent />
				</NavbarItem>
				<DarkModeToggle />
			</NavbarContent>
		</Navbar>
	);
}
