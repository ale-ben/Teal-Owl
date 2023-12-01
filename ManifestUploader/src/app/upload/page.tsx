'use client';
import { IPFSObject, uploadObjectToIPFS } from '@/serverActions/ipfs';
import { Button } from '@nextui-org/button';
import { useEffect, useState } from 'react';
import { FileRejection } from 'react-dropzone';
import InputComponent from './components/InputComponent';
import FileListComponent from './components/FileListComponent';
import ControlComponent from './components/ControlComponent';

export default function Upload() {
	const [acceptedList, setAcceptedList] = useState<File[]>([]);
	const [rejectedList, setRejectedList] = useState<FileRejection[]>([]);

	function resetLists() {
		setAcceptedList([]);
		setRejectedList([]);
	}

	return (
		<div className="m-5">
			<p className="pb-10 text-center text-3xl">Upload a new manifest</p>
			<InputComponent accepted={{list: acceptedList, set: setAcceptedList}} rejected={{list: rejectedList, set: setRejectedList}}/>			
			<FileListComponent acceptedList={acceptedList} rejectedList={rejectedList}/>
			<hr className="my-8 h-px border-0 bg-gray-200 dark:bg-gray-700"></hr>
			<ControlComponent acceptedFiles={acceptedList} rejectedFiles={rejectedList} resetLists={resetLists}/>
		</div>
	);
}
