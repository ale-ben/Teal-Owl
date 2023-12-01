'use client';

import { FileRejection } from 'react-dropzone';

interface FileListComponentProps {
	acceptedList: File[];
	rejectedList: FileRejection[];
}

export default function FileListComponent({
	acceptedList,
	rejectedList
}: FileListComponentProps) {
	return (
		<div className="grid grid-cols-2 mt-5">
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
								file.file.name + file.file.size + file.file.type
							}
						>
							{' '}
							{file.file.name}:
							<ol className="mt-2 list-inside list-disc space-y-1 pl-5">
								{file.errors.map((error) => (
									<li key={error.code}>{error.message}</li>
								))}
							</ol>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}
