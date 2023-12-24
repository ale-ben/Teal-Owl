import { ManifestType, zManifestType } from '@teal-owl/types';
import { z } from 'zod';

export interface WMSubParagraph {
	id: string;
	openTag?: Element;
}

const zWMSubParagraph = z.object({
	id: z.string(),
	openTag: z.any().optional()
});

export enum VerificationStatus {
	VALID = 'Valid',
	INVALID = 'Not Valid',
	UNKNOWN = 'Unknown'
}

const zVerificationStatus = z.enum([
	VerificationStatus.VALID,
	VerificationStatus.INVALID,
	VerificationStatus.UNKNOWN
]);

export interface WatermarkInfo {
	author: string;
	document: string;
	verificationStatus: VerificationStatus;
}

const zWatermarkInfo = z.object({
	author: z.string(),
	document: z.string(),
	verificationStatus: zVerificationStatus
});

export interface WMParagraph {
	id: string;
	openTag?: Element;
	subTags?: WMSubParagraph[];
	watermark?: WatermarkInfo;
}

export const zWMParagraph = z.object({
	id: z.string(),
	openTag: z.any().optional(),
	subTags: z.array(zWMSubParagraph).optional(),
	watermark: zWatermarkInfo.optional()
});

export function parseWatermarks(
	watermarks: unknown
): WMParagraph[] | undefined {
	const zWMArray = z.array(zWMParagraph);

	const wmArray = zWMArray.safeParse(watermarks);

	if (wmArray.success) {
		return wmArray.data;
	}
}

export function parseManifests(manifests: unknown): ManifestType[] | undefined {
	const zManifestArray = z.array(zManifestType);

	const manifestArray = zManifestArray.safeParse(manifests);

	if (manifestArray.success) {
		return manifestArray.data;
	}
}
