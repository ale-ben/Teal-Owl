/*
 * Status codes:
 * 0 - Empty
 * 1 - Parsed
 * 1 - Validated
 * 3 - Showing
 */

/**
 * Reads the status tag from header and returns the status code
 * @param meta the watermarking-meta tag
 * @returns the status code of the page (0-3) or 0 if no status tag exists
 */
function getStatus(meta: Element): number {
	console.log('getStatus', meta);
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
	console.debug('setStatus', meta, status);
	const stat = document.createElement('status');
	stat.textContent = status.toString();
	meta.appendChild(stat);
	return status;
}

/**
 * Entrypoint for the page parser, called by onClicked event in background.ts
 */
export function toggleReader() {
	console.log('parseContent');
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

function parsePage() {
	//const body = document.body;
}
