'use client';
import { IPFSObject, uploadObjectToIPFS } from '@/serverActions/ipfs';
import { Button } from '@nextui-org/button';
import { useEffect, useState } from 'react';
import { FileRejection } from 'react-dropzone';
import InputComponent from './components/InputComponent';

export default function Upload() {
	const [acceptedList, setAcceptedList] = useState<File[]>([]);
	const [rejectedList, setRejectedList] = useState<FileRejection[]>([]);
	const [uploadedOBJs, setUploadedOBJs] = useState<IPFSObject[]>([]);

	function onSubmit() {
		acceptedList.forEach(async (file) => {
			// Log to console file content
			file.text().then(async (text) => {
				let obj: IPFSObject = {
					name: file.name,
					content: JSON.parse(text),
					uri: undefined
				};
				obj = await uploadObjectToIPFS(obj);
				setUploadedOBJs([...uploadedOBJs, obj]);
			});
		});
		setAcceptedList([]);
		setRejectedList([]);
	}

	return (
		<div className="m-5">
			<p className="pb-3 text-center text-3xl">Upload a new manifest</p>
			<InputComponent accepted={{list: acceptedList, set: setAcceptedList}} rejected={{list: rejectedList, set: setRejectedList}}/>			
			<div className="grid grid-cols-2">
				<div className="mt-5">
					<p className="text-xl">Accepted files:</p>
					<ul className="max-w-md list-inside list-disc space-y-1 ">
						{acceptedList.map((file) => (
							<li key={file.name + file.size + file.type}>
								{' '}
								{file.name}
							</li>
						))}
					</ul>
				</div>
				<div className="mt-5">
					<p className="text-xl">Rejected files:</p>
					<ul className="max-w-md list-inside list-disc space-y-1 ">
						{rejectedList.map((file) => (
							<li
								key={
									file.file.name +
									file.file.size +
									file.file.type
								}
							>
								{' '}
								{file.file.name}:
								<ol className="mt-2 list-inside list-disc space-y-1 pl-5">
									{file.errors.map((error) => (
										<li key={error.code}>
											{error.message}
										</li>
									))}
								</ol>
							</li>
						))}
					</ul>
				</div>
			</div>
			<hr className="my-8 h-px border-0 bg-gray-200 dark:bg-gray-700"></hr>
			<div className="flex flex-row justify-between">
				<div>
					<p className="text-xl">Uploaded files:</p>
					<ul className="max-w-md list-inside list-disc space-y-1 ">
						{uploadedOBJs.map((obj) => (
							<li key={obj.uri}>
								{obj.name} -{' '}
								<a
									href={obj.uri}
									className="italic text-blue-600"
								>
									{obj.uri}
								</a>
							</li>
						))}
					</ul>
				</div>
				<div className="flex flex-col gap-2 w-60">
					<Button
						isDisabled={acceptedList.length === 0}
						color="primary"
						onClick={onSubmit}
						className="h-14"
					>
						Upload
					</Button>
					<Button
						isDisabled={
							acceptedList.length === 0 &&
							rejectedList.length === 0
						}
						color="danger"
						className="h-14"
						onClick={() => {
							setAcceptedList([]);
							setRejectedList([]);
						}}
					>
						Clear
					</Button>
				</div>
			</div>
		</div>
	);
}
