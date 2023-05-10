export module Payload {
	function algorithmDecToBinConverter(signature : number[]) {
		var signatureStr = "";
		for (let i = 0; i < signature.length; i++) {
			var byte = signature[i];
			if (byte < 0) 
				byte += 256;
			var byteStr = byte.toString(2);
			while (byteStr.length  < 8) byteStr = "0" + byteStr;
			signatureStr += byteStr;
		}
		return signatureStr;
	}

	export function generatePayload(userID: string, docID: string): string {
		const payload = userID + "," + docID;

		const hash = Utilities.computeDigest(Utilities.DigestAlgorithm.MD5, payload);

		return payload + "," + algorithmDecToBinConverter(hash);
	}
}


export function testPayload() {
	console.log(Payload.generatePayload("test1", "123456"));
}