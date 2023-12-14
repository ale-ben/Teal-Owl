export module Manifest {
	interface Manifest {
		version: string;
		author: string;
		document: string;
		hashList: string[];
		timestamp: Date;
		notes: string | undefined;
	}

	export function GenerateManifest(
		userID: string,
		documentID: string,
		hashList: string[],
		notes?: string
	): Manifest {
		return {
			version: '1.0',
			author: userID,
			document: documentID,
			hashList: hashList,
			timestamp: new Date(),
			notes: notes
		};
	}
}
