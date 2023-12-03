import { isManifestModel } from '@/models/ManifestModel';
import { IPFSObject, uploadObjectToIPFS } from '@/serverActions/ipfs';
import { saveManifestInfo } from '@/utils/contractUtils';
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
				const content = JSON.parse(text);

				// Check if file is a valid ManifestModel
				if (!isManifestModel(content)) {
					console.error('File is not a valid ManifestModel', content);
					return;
				}

				// Prepare object to upload to IPFS
				let obj: IPFSObject = {
					name: file.name,
					content: content,
					uri: undefined
				};

				// Upload object to IPFS
				obj = await uploadObjectToIPFS(obj);

				// Save uploaded object to Smart Contract
				if (obj.uri) {
					saveManifestInfo(
						content.author,
						content.document,
						obj.uri
					).then((success) => {
						if (success) setUploadedOBJs([...uploadedOBJs, obj]);
						else
							console.error(
								'Error saving object to Smart Contract',
								obj
							);
					});
				} else {
					console.error(
						'Error uploading object to IPFS. URI is undefined',
						obj
					);
					return;
				}
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
					isDisabled={
						acceptedFiles.length === 0 && rejectedFiles.length === 0
					}
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
