import { IPFSObject, uploadObjectToIPFS } from '@/serverActions/ipfs';
import { Button } from '@nextui-org/button';
import { useState } from 'react';
import { FileRejection } from 'react-dropzone';

interface ControlComponentProps {
	acceptedFiles: File[];
	rejectedFiles: FileRejection[];
	resetLists: () => void;
}

export default function ControlComponent({
	acceptedFiles,
	rejectedFiles,
	resetLists
}: ControlComponentProps) {
	const [uploadedOBJs, setUploadedOBJs] = useState<IPFSObject[]>([]);

	function onSubmit() {
		acceptedFiles.forEach(async (file) => {
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
		resetLists();
	}

	return (
		<div className="flex flex-row justify-between">
			<div>
				<p className="text-xl">Uploaded files:</p>
				<ul className="max-w-md list-inside list-disc space-y-1 ">
					{uploadedOBJs.map((obj) => (
						<li key={obj.uri}>
							{obj.name} -{' '}
							<a href={obj.uri} className="italic text-blue-600">
								{obj.uri}
							</a>
						</li>
					))}
				</ul>
			</div>
			<div className="flex flex-col gap-2 w-60">
				<Button
					isDisabled={acceptedFiles.length === 0}
					color="primary"
					onClick={onSubmit}
					className="h-14"
				>
					Upload
				</Button>
				<Button
					isDisabled={acceptedFiles.length === 0 && rejectedFiles.length === 0}
					color="danger"
					className="h-14"
					onClick={resetLists}
				>
					Clear
				</Button>
			</div>
		</div>
	);
}
