// interface WMParagraph {
// 	begin: Element;
// 	status: number;
// 	crossParagraph: WMParagraph | undefined;
// }

/*
 * Status codes:
 * 0 - Empty
 * 1 - Parsed
 * 1 - Validated
 * 3 - Showing
 */

/**
 * Entrypoint for the page parser, called by onClicked event in background.ts
 */
export function toggleReader() {
	let status: number;

	// Check if meta tag exists
	let meta = document.head.getElementsByTagName('watermarking-meta')[0];

	// If meta tag exists, check and update status
	if (meta) {
		status = getStatus(meta);
	} else {
		meta = document.createElement('watermarking-meta');
		document.head.appendChild(meta);
		status = setStatus(meta, 0);
	}

	switch (status) {
		case 1:
			// TODO
			break;
		case 2:
			// TODO
			break;
		case 3:
			// TODO
			break;
		default:
			// Page has not been parsed yet
			parsePage();
			setStatus(meta, 1);
			break;
	}
}

/**
 * Reads the status tag from header and returns the status code
 * @param meta the watermarking-meta tag
 * @returns the status code of the page (0-3) or 0 if no status tag exists
 */
function getStatus(meta: Element): number {
	const metaStatus = meta.getElementsByTagName('status')[0]?.textContent;
	if (metaStatus) {
		return parseInt(metaStatus);
	}
	return 0;
}

/**
 * Writes the status tag to header and returns the status code
 * @param meta the watermarking-meta tag
 * @param status the status code of the page (0-3)
 * @returns the status code of the page (0-3)
 */
function setStatus(meta: Element, status: number): number {
	//FIXME: If status already exists, DO NOT RECREATE IT
	const stat = document.createElement('status');
	stat.textContent = status.toString();
	meta.appendChild(stat);
	return status;
}

/**
 * Parses a string and adds watermarking tags. if string contains multiple paragraphs, it will be split and parsed recursively
 * @param paragraph The string to parse
 * @param wmIndex The index of the watermarking tag
 * @returns The parsed string
 */
function parseString(paragraph: string, wmIndex: number): string {
	// //TODO: Manage paragraphs

	let newString =
		'<mark class="watermark-marktag" id="watermark-' + wmIndex + '">';
	newString += paragraph;

	newString += '</mark>';

	return newString;
}

/**
 * Parses the page and adds watermarking tags
 */
function parsePage() {
	const body = document.body.innerHTML;

	// This will contain the new body with watermarking tags
	let newBody = '';

	// Index of last character added to newBody
	let lastIndex = 0;

	// Index of watermarking tag
	let wmIndex = 0;

	// Non Printable Character used to separate paragraphs
	const NPC = '§';

	// Find first NPC in body
	let beginIndex = body.indexOf(NPC);
	while (beginIndex !== -1) {
		// Find closing NPC
		const endIndex = body.indexOf(NPC, beginIndex + 1);

		// If no closing NPC is found, break
		if (endIndex === -1) break;

		// Save everything new preceding NPC in newBody
		newBody += body.substring(lastIndex, beginIndex);

		// Update lastIndex to current end index
		lastIndex = endIndex + 1;

		// Parse string between NPC and add to newBody
		const tmp = body.substring(beginIndex, endIndex + 1);
		newBody += parseString(tmp, wmIndex);

		// Increment wmIndex
		wmIndex += 1;

		// Find next opening NPC
		beginIndex = body.indexOf(NPC, endIndex + 1);
	}

	// Add everything after last NPC to newBody
	newBody += body.substring(lastIndex, body.length);

	// Replace body with newBody
	document.body.innerHTML = newBody;
}
