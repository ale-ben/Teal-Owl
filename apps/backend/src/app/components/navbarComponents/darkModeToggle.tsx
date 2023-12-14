'use client';

import { Button } from '@nextui-org/button';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { MdDarkMode, MdLightMode } from 'react-icons/md';

const DarkModeToggle = () => {
	const [mounted, setMounted] = useState(false);
	const { theme, setTheme } = useTheme();

	// When mounted on client, now we can show the UI
	// See here to know why https://github.com/pacocoursey/next-themes#avoid-hydration-mismatch
	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return (
			<Button isIconOnly>
				<MdDarkMode className="text-xl" />
			</Button>
		);
	}

	return (
		<Button
			isIconOnly
			onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
		>
			{theme === 'light' ? (
				<MdDarkMode className="text-xl" />
			) : (
				<MdLightMode className="text-xl" />
			)}
		</Button>
	);
};

export default DarkModeToggle;
