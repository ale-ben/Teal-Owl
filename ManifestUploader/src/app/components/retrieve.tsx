'use client';

import { IPFSObject, downloadObjectFromIPFS } from '@/serverActions/ipfsActions';
import { useRef, useState } from 'react';
import { BsSearch } from 'react-icons/bs';

export function RetrieveComponent() {
	const textinRef = useRef<HTMLInputElement>(null);
	const [retrievedObj, setRetrievedObj] = useState<IPFSObject>();

	return (
		<div>
			<div className="flex items-center">
				<label htmlFor="simple-search" className="sr-only">
					Search
				</label>
				<div className="relative w-full">
					<input
						type="text"
						id="simple-search"
						ref={textinRef}
						className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
						placeholder="Search CID..."
						required
					/>
				</div>
				<button
					type="submit"
					className="ml-2 rounded-lg border border-blue-700 bg-blue-700 p-2.5 text-sm font-medium text-white hover:bg-blue-800"
					onClick={async () => {
						const cid = textinRef.current?.value;
						if (cid) {
							console.log('cid', cid);
							const res = await downloadObjectFromIPFS(cid);
							setRetrievedObj(res);
							console.log('res', retrievedObj);
						}
					}}
				>
					<BsSearch className="h-4 w-4" />
					<span className="sr-only">Search</span>
				</button>
			</div>
			<hr className="my-8 h-px border-0 bg-gray-200"></hr>
			{retrievedObj !== undefined ? (
				<div className="relative overflow-x-auto">
					<table className="w-full text-left text-sm text-gray-500 rtl:text-right">
						<thead className="bg-gray-50 text-xs uppercase text-gray-700">
							<tr>
								<th scope="col" className="px-6 py-3">
									Key
								</th>
								<th scope="col" className="px-6 py-3">
									Value
								</th>
							</tr>
						</thead>
						<tbody>
							{Object.entries(retrievedObj.content).map(
								([key, value]) => (
									<tr key={key} className="border-b bg-white">
										<th
											scope="row"
											className="whitespace-nowrap px-6 py-4 font-medium text-gray-900"
										>
											{key}
										</th>
										<td className="px-6 py-4">{value}</td>
									</tr>
								)
							)}
						</tbody>
					</table>
				</div>
			) : (
				<div></div>
			)}
		</div>
	);
}
