import { IPFSObject } from "@/serverActions/ipfs";

interface ResultsProps {
	retrievedObj: IPFSObject;
}

const Results = ({retrievedObj}: ResultsProps) => {
	return (
		<div className="relative overflow-x-auto">
			<table className="w-full text-left text-sm rtl:text-right">
				<thead className="text-xs uppercase">
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
							<tr key={key} className="border-b ">
								<th
									scope="row"
									className="whitespace-nowrap px-6 py-4 font-medium"
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
	);
};

export default Results;
