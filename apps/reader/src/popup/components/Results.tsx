import { ManifestType } from '@teal-owl/types';
import { State } from '../models/popupReducer';
import Result from './Result';

interface props {
	state: State;
}

const Results = ({ state }: props) => {
	//TODO: Could this be a scrollable list?
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
		</div>
	);
};

export default Results;
