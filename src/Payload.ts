export module Payload {
	/**
	 * Generate SHA256 hash of string
	 * https://stackoverflow.com/questions/59381945/how-do-i-get-google-apps-script-to-do-sha-256-encryption
	 * @param value
	 * @returns
	 */
	export function Sha256Hash(value: string): string {
		return BytesToHex(
			Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, value)
		);
	}

	/**
	 * Convert bytes array to hex string
	 * https://stackoverflow.com/questions/59381945/how-do-i-get-google-apps-script-to-do-sha-256-encryption
	 * @param bytes
	 * @returns
	 */
	function BytesToHex(bytes: number[]): string {
		const hex = [];
		for (let i = 0; i < bytes.length; i++) {
			const b = bytes[i];
			let c;
			if (b < 0) {
				c = (256 + b).toString(16);
			} else {
				c = b.toString(16);
			}
			if (c.length == 1) {
				hex.push('0' + c);
			} else {
				hex.push(c);
			}
		}
		return hex.join('');
	}

	/**
	 * Generate payload for watermarking
	 * @param userID ID of the author of the document
	 * @param docID ID of the document
	 * @returns Payload as string
	 */
	export function GeneratePayload(userID: string, docID: string): string {
		// Base payload
		let payload = userID + ',' + docID;

		// Generarte hash of payload
		const hash = Sha256Hash(payload);

		// Add hash to payload (as string)
		payload += ',' + hash;
		console.log(hash);
		console.log(payload);

		return payload;
	}

	export function StringToBinStr(str: string): string {
		let result = '';
		for (let i = 0; i < str.length; i++) {
			result += str.charCodeAt(i).toString(2).padStart(8, '0');
		}
		return result;
	}

	export function BinStrToString(binStr: string): string {
		let result = '';
		for (let i = 0; i < binStr.length; i += 8) {
			result += String.fromCharCode(
				parseInt(binStr.substring(i, i + 8), 2)
			);
		}
		return result;
	}
}

export function testPayload() {
	const initPay = Payload.GeneratePayload('test1', '123456');
	console.log(initPay);
	const binStr = Payload.StringToBinStr(initPay);
	console.log(binStr);
	const str = Payload.BinStrToString(binStr);
	console.log(str);
	console.log('Works: ', initPay == str);
}
