'use client';

import { MdLightMode, MdDarkMode } from 'react-icons/md';
import { useTheme } from 'next-themes';
import { Button } from '@nextui-org/button';
import { useState, useEffect } from 'react';

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
