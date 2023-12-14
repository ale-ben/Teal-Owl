import { z } from 'zod';

export interface ManifestModel {
	version: string;
	author: string;
	document: string;
	timestamp: string;
	hashList: string[];
	notes?: string;
}

const manifestModelSchema = z.object({
	version: z.string(),
	author: z.string(),
	document: z.string(),
	timestamp: z.string(), // TODO: Check if timestamp is a valid date
	hashList: z.array(z.string()),
	notes: z.string().optional()
});

export function isManifestModel(obj: unknown): obj is ManifestModel {
	return manifestModelSchema.safeParse(obj).success;
}
