import { ManifestType } from "@teal-owl/types";

interface ResultsProps {
	retrievedObj: ManifestType;
}

const Results = ({ retrievedObj }: ResultsProps) => {
	return (
		<div className="relative overflow-x-auto m-5">
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
					{Object.entries(retrievedObj).map(([key, value]) => (
						<tr key={key} className="border-b ">
							<th
								scope="row"
								className="whitespace-nowrap px-6 py-4 font-medium"
							>
								{key}
							</th>
							<td className="px-6 py-4">{value}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default Results;
