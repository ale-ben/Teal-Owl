'use client';

import { Link } from '@nextui-org/link';
import { NavbarItem } from '@nextui-org/navbar';
import { usePathname } from 'next/navigation';

interface NavbarButtonProps {
	href: string;
	text: string;
}
const NavbarButton = ({ href, text }: NavbarButtonProps) => {
	const pathname = usePathname();

	return (
		<NavbarItem isActive={pathname === href}>
			{pathname === href ? (
				<Link href={href} aria-current="page">
					{text}
				</Link>
			) : (
				<Link href={href} color="foreground">
					{text}
				</Link>
			)}
		</NavbarItem>
	);
};

export default NavbarButton;
