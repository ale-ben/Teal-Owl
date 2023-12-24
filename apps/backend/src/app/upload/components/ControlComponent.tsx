import { uploadToIPFS } from '@/serverActions/ipfsActions';
import { saveManifestInfo } from '@/utils/contractSignerUtils';
import { Button } from '@nextui-org/button';
import { IPFSObject } from '@teal-owl/ipfs-utils';
import { isManifestType } from '@teal-owl/types';
import { useState } from 'react';
import { FileRejection } from 'react-dropzone';
import { useAccount } from 'wagmi';

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
	const { isConnected } = useAccount();

	function onSubmit() {
		acceptedFiles.forEach(async (file) => {
			// Log to console file content
			file.text().then(async (text) => {
				const content = JSON.parse(text);

				// Check if file is a valid ManifestModel
				if (!isManifestType(content)) {
					console.error('File is not a valid ManifestModel', content);
					return;
				}

				// Prepare object to upload to IPFS
				let obj: IPFSObject = {
					name: file.name,
					content: content,
					cid: undefined
				};

				// Upload object to IPFS
				const tmpObj = await uploadToIPFS(obj);
				if (tmpObj) obj = tmpObj;
				else throw new Error('Error uploading object to IPFS');

				// Save uploaded object to Smart Contract
				if (obj.cid) {
					saveManifestInfo(
						content.author,
						content.document,
						obj.cid
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
						'Error uploading object to IPFS. CID is undefined',
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
						<li key={obj.cid}>
							{obj.name} -{' '}
							<a
								href={'ipfs://' + obj.cid}
								className="italic text-blue-600"
							>
								{obj.cid}
							</a>
						</li>
					))}
				</ul>
			</div>
			<div className="flex flex-col gap-2 w-60">
				<Button
					isDisabled={acceptedFiles.length === 0 || !isConnected}
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
