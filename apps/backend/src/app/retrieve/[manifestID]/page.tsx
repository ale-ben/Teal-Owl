import { getManifest } from '@/serverActions/retrieveActions';
import { Divider } from '@nextui-org/divider';
import Results from './components/results';
import { ManifestType } from "@teal-owl/types";

interface RetrieveDocProps {
	params: { manifestID: string };
}

export default async function RetrieveDoc({ params }: RetrieveDocProps) {
	const retrievedObj: ManifestType | undefined = await getManifest(
		params.manifestID
	);

	return (
		<div className="m-5">
			<p className="pb-3 text-center text-3xl">
				Manifest {params.manifestID}
			</p>
			{retrievedObj !== undefined ? (
				<div>
					<Divider className="my-8" />
					<Results retrievedObj={retrievedObj} />
				</div>
			) : (
				<div></div>
			)}
		</div>
	);
}
