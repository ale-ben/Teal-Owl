async function generateSHA256Hash(str: string): Promise<string> {
	const sha256 = await import('js-sha256');
	return sha256.sha256(str);
}

export async function VerifyPayload(payload: string): Promise<{
	valid: boolean;
	author: string | undefined;
	document: string | undefined;
}> {
	const payloadParts = stringToBinStr(payload).split(',');
	if (payloadParts.length !== 3) {
		return { valid: false, author: undefined, document: undefined };
	}

	const [author, document, hash] = payloadParts;

	const generatedHash = await generateSHA256Hash(`${author},${document}`);

	return { valid: hash === generatedHash, author, document };
}

function stringToBinStr(str: string): string {
	let result = '';
	for (let i = 0; i < str.length; i++) {
		result += str.charCodeAt(i).toString(2).padStart(8, '0');
	}
	return result;
}
