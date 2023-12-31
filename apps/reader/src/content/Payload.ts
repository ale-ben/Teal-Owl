import { hashText } from '@teal-owl/watermarking';

export function VerifyPayload(payload: string): {
	valid: boolean;
	author: string | undefined;
	document: string | undefined;
} {
	const payloadParts = binStrToString(payload).split(',');
	if (payloadParts.length !== 3) {
		console.warn('Invalid payload length!', payloadParts);
		return { valid: false, author: undefined, document: undefined };
	}

	const [author, document, hash] = payloadParts;

	const generatedHash = hashText(`${author},${document}`);

	return { valid: hash === generatedHash, author, document };
}

function binStrToString(binStr: string): string {
	let result = '';
	for (let i = 0; i < binStr.length; i += 8) {
		result += String.fromCharCode(parseInt(binStr.substring(i, i + 8), 2));
	}
	return result;
}
