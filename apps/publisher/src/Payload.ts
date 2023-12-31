import { hashText } from '@teal-owl/watermarking';

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
	const hash = hashText(payload);

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
		result += String.fromCharCode(parseInt(binStr.substring(i, i + 8), 2));
	}
	return result;
}
