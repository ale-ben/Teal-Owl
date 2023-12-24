import { ManifestType } from '@teal-owl/types';
import { State } from '../models/popupReducer';
import Result from './Result';
import { manta } from 'viem/chains';

interface props {
	state: State;
}

const Results = ({ state }: props) => {
	// List of authors and documents
	const authorList = state.manifestStorage.map((manifest) => manifest.author);
	const documentList = state.manifestStorage.map((manifest) => manifest.document);

	// List of all watermarks that do not have a corresponding manifest
	const orphanWatermarks = state.watermarkList.filter(
		(wm) =>
			!authorList.includes(wm.watermark?.author ?? '') &&
			!documentList.includes(wm.watermark?.document ?? '')
	);

	return (
		<div className="flex flex-col gap-3 my-5 overflow-scroll">
			{state.manifestStorage.map((manifest: ManifestType) => (
				<Result
					key={manifest.author + manifest.document}
					manifest={manifest}
					watermarkList={state.watermarkList.filter(
						(wm) =>
							wm.watermark?.author === manifest.author &&
							wm.watermark.document === manifest.document
					)}
				/>
			))}
			{ (orphanWatermarks.length > 0) ? (
				<Result manifest={undefined} watermarkList={orphanWatermarks}/>
			) : (
				<></>
			) }
		</div>
	);
};

export default Results;
