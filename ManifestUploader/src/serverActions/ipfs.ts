"use server"

import { ThirdwebStorage } from "@thirdweb-dev/storage";

const apiKey = "7pczWSx3zUjnuPxVyT-IrIwD4cp47JrrGRj2ZX5wvsVLhMJhnne6tec2fYA6sm-JPXfNBiY0hmCkI18kPuphsA";
const storage = new ThirdwebStorage({secretKey: apiKey});

export async function uploadObjectToIPFS(obj: Object): Promise<string> {
	const cid = await storage.upload(obj, {
		alwaysUpload: false
	});
	return cid;
}

export async function downloadObjectFromIPFS(cid: string): Promise<string> {
	if (!cid.startsWith("ipfs://")) cid = "ipfs://" + cid;
	try {
		const obj = await storage.downloadJSON(cid);
		return JSON.stringify(obj);
	} catch (e) {
		console.log("Error while retrieving file " + cid, e);
		return "";
	}
}