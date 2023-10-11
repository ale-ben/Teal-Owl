import {Parser} from "./Parser";
import {Payload} from "./Payload";

export module Manifest {
	interface Manifest {
		userID: string;
		documentID: string;
		documentName: string;
		documentHash: string;
		generationDate: Date;
		notes: string | undefined;
	}

	export function GenerateManifest(userID : string, documentID : string, documentName : string, documentText : string, notes? : string): Manifest {
		const hash = Payload.Sha256Hash(documentText);

		return {
			userID: userID,
			documentID: documentID,
			documentName: documentName,
			documentHash: hash,
			generationDate: new Date(),
			notes: notes
		};
	}
}
