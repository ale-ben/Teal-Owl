export interface ManifestModel {
	version: string;
	author: string;
	document: string;
	timestamp: string;
	hashList: string[];
	notes?: string;
}

export function isManifestModel(obj: unknown): obj is ManifestModel {
	if (obj === null || typeof obj !== 'object') return false;

	//TODO: Check if timestamp is a valid date
	//TODO: Check if elements of hashList are valid hashes

	return (
		obj !== null &&
		typeof obj === 'object' &&
		'version' in obj &&
		typeof obj.version === 'string' &&
		'author' in obj &&
		typeof obj.author === 'string' &&
		'document' in obj &&
		typeof obj.document === 'string' &&
		'timestamp' in obj &&
		typeof obj.timestamp === 'string' &&
		'hashList' in obj &&
		Array.isArray(obj.hashList) &&
		'notes' in obj &&
		(typeof obj.notes === 'string' || typeof obj.notes === 'undefined')
	);
}
