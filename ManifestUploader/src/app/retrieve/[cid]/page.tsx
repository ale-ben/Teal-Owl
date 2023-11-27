import { IPFSObject } from '@/serverActions/ipfs';
import { Divider } from '@nextui-org/divider';
import Results from './components/results';
import SearchBar from './components/searchBar';

interface RetrieveDocProps {
	params: { cid: string },
	retrievedObj: IPFSObject | undefined;
}

const RetrieveDoc = ({ params, retrievedObj }: RetrieveDocProps) => {
	return (
		<div className="m-5">
			<p className="pb-3 text-center text-3xl">Retrieve a manifest</p>
			<SearchBar defaultValue={params.cid}/>
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
};

export default RetrieveDoc;
