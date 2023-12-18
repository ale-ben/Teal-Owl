import { z } from 'zod';

const manifestModelSchema = z.object({
	version: z.string(),
	author: z.string(),
	document: z.string(),
	timestamp: z.string(), // TODO: Check if timestamp is a valid date
	hashList: z.array(z.string()),
	notes: z.string().optional()
});

export interface ManifestType {
	version: string;
	author: string;
	document: string;
	timestamp: string;
	hashList: string[];
	notes?: string;
}

/**
 * Type Guard that checks if the given object is a valid ManifestType.
 * @param obj The object to check
 * @returns true if the object is a valid ManifestType
 */
export function isManifestType(obj: unknown): obj is ManifestType {
	return manifestModelSchema.safeParse(obj).success;
}

/**
 * Creates a Manifest object from the given object.
 * @param obj The object to create a Manifest from
 * @returns A Manifest object or undefined if the object is invalid
 */
export function ManifestTypeFromObject(obj: unknown): ManifestType | undefined {
	const result = manifestModelSchema.safeParse(obj);
	if (result.success) {
		return result.data;
	}
	return undefined;
}
