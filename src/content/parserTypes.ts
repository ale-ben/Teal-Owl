export interface WMParagraph {
	id: string;
	openTag: Element | undefined;
	subTags: WMSubParagraph[] | undefined;
	watermark: WatermarkInfo | undefined;
}

export interface WMSubParagraph {
	id: string;
	openTag: Element | undefined;
}

export interface WatermarkInfo {
	author: string;
	document: string;
	verificationStatus: VerificationStatus;
}

export enum Status {
	EMPTY,
	VALIDATED,
	SHOWING
}

export enum VerificationStatus {
	VALID,
	INVALID,
	UNKNOWN
}
