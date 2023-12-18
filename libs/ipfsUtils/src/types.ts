import { ManifestType } from '@teal-owl/types';

export interface IPFSObject {
	cid: string | undefined;
	name?: string;
	content: ManifestType;
}
