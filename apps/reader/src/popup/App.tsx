import { useReducer } from 'react';
import { parseManifests, parseWatermarks } from '../models/parserTypes';
import Results from './components/Results';
import ValidateButton from './components/ValidateButton';
import { initialState, reducer } from './models/popupReducer';

function App() {
	const [state, dispatch] = useReducer(reducer, initialState);

	chrome.storage.session.setAccessLevel({
		accessLevel: 'TRUSTED_AND_UNTRUSTED_CONTEXTS'
	});

	chrome.storage.session.get('manifests', (result) => {
		if ('manifests' in result) {
			const manifests = parseManifests(result.manifests);

			console.log('Manifests', manifests);
			if (manifests !== undefined)
				dispatch({ type: 'SET_MANIFEST_LIST', manifests });
		}
	});
	chrome.storage.session.get('watermarks', (result) => {
		if ('watermarks' in result) {
			const watermarks = parseWatermarks(result.watermarks);

			console.log('Watermarks', watermarks);
			if (watermarks !== undefined)
				dispatch({ type: 'SET_WATERMARK_LIST', watermarks });
		}
	});

	chrome.storage.onChanged.addListener((changes) => {
		if ('manifests' in changes) {
			const manifests = parseManifests(changes.manifests.newValue);

			console.log('Manifests', manifests);
			if (manifests !== undefined)
				dispatch({ type: 'SET_MANIFEST_LIST', manifests });
		} else if ('watermarks' in changes) {
			const watermarks = parseWatermarks(changes.watermarks.newValue);

			console.log('Watermarks', watermarks);
			if (watermarks !== undefined)
				dispatch({ type: 'SET_WATERMARK_LIST', watermarks });
		}
	});

	return (
		<div className="flex min-h-96 max-h-[38rem] w-96 flex-col justify-evenly bg-blue-900 p-5">
			<p className="text-center text-3xl font-bold text-white">
				Teal Owl - Reader
			</p>
			<ValidateButton actionLabel={state.validateButtonLabel} />
			<Results state={state} />
		</div>
	);
}

export default App;
