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
	const isActive = pathname.startsWith(href);

	return (
		<NavbarItem isActive={isActive}>
			{isActive ? (
				<Link href={href} aria-current="page" color="primary">
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
