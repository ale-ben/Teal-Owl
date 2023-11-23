'use client';
import { MdLightMode, MdDarkMode } from 'react-icons/md';
import { useTheme } from 'next-themes';
import { Button } from '@nextui-org/button';

const DarkModeToggle = () => {
	const { theme, setTheme } = useTheme();

	return (
		<Button
			isIconOnly
			onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
		>
			{theme === 'light' ? <MdDarkMode className="text-xl"/> : <MdLightMode className="text-xl"/>}
		</Button>
	);
};

export default DarkModeToggle;
