'use client';

import { Button } from '@nextui-org/button';
import { Input } from '@nextui-org/input';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';
import { BsSearch } from 'react-icons/bs';

interface SearchBarProps {
	defaultValue: string;
}

const SearchBar = ({ defaultValue }: SearchBarProps) => {
	let inputRef = useRef<HTMLInputElement>(null);
	const router = useRouter();

	function submit() {
		if (inputRef.current !== null) {
			console.log(inputRef.current.value);
			if (inputRef.current.value === '') router.push(`/retrieve`);
			else router.push(`/retrieve/${inputRef.current.value}`);
		}
	}

	return (
		<div className="flex items-center gap-2">
			<Input
				placeholder="Search CID..."
				defaultValue={defaultValue}
				ref={inputRef}
				required
			/>
			<Button className="h-14" onClick={submit}>
				<BsSearch className="h-4 w-4" />
				<span className="sr-only">Search</span>
			</Button>
		</div>
	);
};

export default SearchBar;
