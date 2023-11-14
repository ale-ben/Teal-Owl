import {
	Navbar,
	NavbarBrand,
	NavbarContent,
	NavbarItem
} from '@nextui-org/navbar';
import { Button } from '@nextui-org/button';
import { Link } from '@nextui-org/link';
import MetamaskLogo from './metamaskLogo';

export default function TONavbar() {
	return (
		<Navbar>
			<NavbarBrand>
				<p className="font-bold text-inherit">Teal Owl</p>
			</NavbarBrand>
			<NavbarContent className="hidden gap-4 sm:flex" justify="center">
				<NavbarItem>
					<Link color="foreground" href="#">
						Upload Manifest
					</Link>
				</NavbarItem>
				<NavbarItem isActive>
					<Link href="#" aria-current="page">
						Retrieve Manifest
					</Link>
				</NavbarItem>
			</NavbarContent>
			<NavbarContent justify="end">
				<NavbarItem>
					<Button color="primary" href="#" variant="flat" startContent={MetamaskLogo()}>
						Connect with MetaMask
					</Button>
				</NavbarItem>
			</NavbarContent>
		</Navbar>
	);
}
