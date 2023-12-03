export interface ManifestModel {
	version: string;
	author: string;
	document: string;
	timestamp: string;
	hashList: string[];
	notes?: string;
}

export function isManifestModel(obj: any): obj is ManifestModel {
	if (obj === null || typeof obj !== 'object') return false;

	//TODO: Check if timestamp is a valid date

	return (
		typeof obj.version === 'string' &&
		typeof obj.author === 'string' &&
		typeof obj.document === 'string' &&
		typeof obj.timestamp === 'string' &&
		Array.isArray(obj.hashList) &&
		(typeof obj.notes === 'string' || typeof obj.notes === 'undefined')
	);
}
