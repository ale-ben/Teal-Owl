'use client';
import { VisuallyHidden } from '@nextui-org/react';
import { useSwitch, SwitchProps } from '@nextui-org/switch';
import { useEffect } from 'react';
import { MdLightMode, MdDarkMode } from 'react-icons/md';
import {useTheme} from "next-themes";

const DarkModeToggle = (props: SwitchProps) => {
	const {
		Component,
		slots,
		isSelected,
		getBaseProps,
		getInputProps,
		getWrapperProps
	} = useSwitch(props);

	const { theme, setTheme } = useTheme();

	useEffect(() => {
		setTheme(isSelected ? 'dark' : 'light')
	}, [isSelected]);

	return (
		<div className="flex flex-col gap-2">
			<Component {...getBaseProps()}>
				<VisuallyHidden>
					<input {...getInputProps()} />
				</VisuallyHidden>
				<div
					{...getWrapperProps()}
					className={slots.wrapper({
						class: [
							'h-8 w-8',
							'flex items-center justify-center',
							'rounded-lg bg-default-100 hover:bg-default-200'
						]
					})}
				>
					{isSelected ? <MdLightMode /> : <MdDarkMode />}
				</div>
			</Component>
		</div>
	);
};

export default DarkModeToggle;
