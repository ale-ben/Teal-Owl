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
	const watermarks = parseWatermarks(
		await chrome.storage.session.get('watermarks')
	);

	// Filter out the watermark with the same id (if no watermark found, get an empty array)
	const filteredWatermarks: WMParagraph[] =
		watermarks !== undefined
			? watermarks?.filter((wm) => wm.id !== id)
			: [];


	// Add the new watermark
	filteredWatermarks.push({
		id: id,
		watermark: watermark,
		openTag: undefined,
		subTags: undefined
	});

	// Save the watermarks
	chrome.storage.session.set({ watermarks: filteredWatermarks }).then(() => {
		console.log('Watermark saved');
	});
}

export function saveManifest(manifest: ManifestType) {
	// Get the current manifests
	const manifests = parseManifests(chrome.storage.local.get('manifests'));

	// Filter out the manifest with the same author and document (if no manifest found, get an empty array)
	const filteredManifests: ManifestType[] =
		manifests !== undefined
			? manifests?.filter(
					(m) =>
						m.author !== manifest.author ||
						m.document !== manifest.document
				)
			: [];

	// Add the new manifest
	filteredManifests.push(manifest);

	// Save the manifests
	chrome.storage.local.set({ manifests: filteredManifests }).then(() => {
		console.log('Manifest saved');
	});
}

/**
 * Gets the manifest with the given author and document from the session storage.
 * @param author The author of the maifest.
 * @param document The document of the maifest.
 * @returns The manifest if found, undefined otherwise.
 */
export function getManifest(author: string, document: string): ManifestType | undefined {
	const manifests = parseManifests(chrome.storage.local.get('manifests'));

	if (manifests !== undefined) {
		return manifests.find(
			(m) => m.author === author && m.document === document
		);
	}
}

/**
 * Gets the watermark with the given id from the session storage.
 * @param id The id of the watermark.
 * @returns The watermark if found, undefined otherwise.
 */
export function getWatermark(id: string): WMParagraph | undefined {
	const watermarks = parseWatermarks(
		chrome.storage.session.get('watermarks')
	);

	if (watermarks !== undefined) {
		return watermarks.find((wm) => wm.id === id);
	}
}
