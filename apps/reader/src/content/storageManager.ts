import { ManifestType } from '@teal-owl/types';
import {
	WMParagraph,
	WatermarkInfo,
	parseManifests,
	parseWatermarks
} from '../models/parserTypes';

/**
 * Saves a watermark in the session storage. If a watermark with the same id already exists, it will be overwritten.
 * @param id The id of the paragraph.
 * @param watermark The watermark to save.
 */
export async function saveWatermark(id: string, watermark: WatermarkInfo) {
	// Get the current watermarks
	const result = await chrome.storage.session.get('watermarks');

	let filteredWatermarks: WMParagraph[] = [];

	if ('watermarks' in result) {
		// Parse the manifests from the result
		const watermarks = parseWatermarks(result.watermarks);

		// Filter out the watermark with the same id (if no watermark found, get an empty array)
		filteredWatermarks =
			watermarks !== undefined
				? watermarks?.filter((wm) => wm.id !== id)
				: [];
	}

	// Push the new watermark
	filteredWatermarks.push({
		id: id,
		watermark: watermark
	});

	// Save the watermarks
	await chrome.storage.session.set({ watermarks: filteredWatermarks });
	console.log('Watermark saved');
}

export async function saveManifest(manifest: ManifestType) {
	// Get the current manifests
	const result = chrome.storage.session.get('manifests');

	let filteredManifests: ManifestType[] = [];

	if ('manifests' in result) {
		// Parse the manifests from the result
		const manifests = parseManifests(result.manifests);

		// Filter out the manifest with the same author and document (if no manifest found, get an empty array)
		filteredManifests =
			manifests !== undefined
				? manifests?.filter(
						(m) =>
							m.author !== manifest.author ||
							m.document !== manifest.document
					)
				: [];
	}

	// Add the new manifest
	filteredManifests.push(manifest);

	// Save the manifests
	await chrome.storage.session.set({ manifests: filteredManifests });
	console.log('Manifest saved', manifest);
}

/**
 * Gets the manifest with the given author and document from the session storage.
 * @param author The author of the maifest.
 * @param document The document of the maifest.
 * @returns The manifest if found, undefined otherwise.
 */
export async function getManifest(
	author: string,
	document: string
): Promise<ManifestType | undefined> {
	// Get the current manifests
	const result = chrome.storage.session.get('manifests');

	if ('manifests' in result) {
		// Parse the manifests from the result
		const manifests = parseManifests(result.manifests);

		if (manifests !== undefined) {
			return manifests.find(
				(m) => m.author === author && m.document === document
			);
		}
	}
}
