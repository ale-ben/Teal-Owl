/* eslint @typescript-eslint/no-unused-vars: "off" */
import { ManifestType } from '@teal-owl/types';
import { GenerateHashList, HTMLToText } from './Parser';
import { GeneratePayload, StringToBinStr } from './Payload';
import {
	saveToHTMLFile,
	saveToJSONFile,
	applyWatermark as utilsApplyWatermark
} from './Utils';

('use strict');

function doGet() {
	try {
		return HtmlService.createTemplateFromFile(
			'build/webpage/index'
		).evaluate();
	} catch (e) {
		// TODO (Developer) - Handle exception
		console.log('Failed with error', e);
		return HtmlService.createHtmlOutput(
			'Failed with error: ' + JSON.stringify(e)
		);
	}
}

function include(filename: string) {
	return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

// ---- Helpèr functions ----
/*
This functions will be called from the client side
*/

/**
 * Gets the user's OAuth 2.0 access token so that it can be passed to Picker.
 * This technique keeps Picker from needing to show its own authorization
 * dialog, but is only possible if the OAuth scope that Picker needs is
 * available in Apps Script. In this case, the function includes an unused call
 * to a DriveApp method to ensure that Apps Script requests access to all files
 * in the user's Drive.
 *
 * @return {string} The user's OAuth 2.0 access token.
 */

function getOAuthToken() {
	try {
		DriveApp.getRootFolder();
		return ScriptApp.getOAuthToken();
	} catch (e) {
		// TODO (Developer) - Handle exception
		console.log('Failed with error', e);
	}
}

/**
 * Gets the user's basic info
 * @returns {Object} Basic info about the user
 */

function getBasicInfo() {
	try {
		return {
			authorID: Session.getActiveUser().getEmail(),
			home: DriveApp.getRootFolder().getId()
			// TODO (Developer) - Add more info
		};
	} catch (e) {
		// TODO (Developer) - Handle exception
		console.log('Failed with error', e);
	}
}

function applyWatermark(documentID: string) {
	// Basic info and paths
	const authorID = Session.getActiveUser().getEmail();
	const doc = DocumentApp.openById(documentID);
	const docFolder = DriveApp.getFileById(documentID).getParents().next();

	const outFolderName = doc.getName() + '_watermarked';
	const outFileName = doc.getName() + '_watermark';
	const outManifestName = doc.getName() + '_manifest';

	const outFolder = docFolder.createFolder(outFolderName);

	// Generate the payload
	const payload = GeneratePayload(authorID, documentID);
	const payloadStr = StringToBinStr(payload);

	// Generate out html
	const outHTML = utilsApplyWatermark(doc, payloadStr);

	// --- Manifest ---
	// Convert HTML back to string
	const htmlStr = HTMLToText(outHTML);
	// Generate hash list
	const hashList = GenerateHashList(htmlStr);
	// Generate manifest
	const manifest: ManifestType = {
		version: '1.0',
		author: authorID,
		document: documentID,
		timestamp: new Date().toISOString(),
		hashList
	};

	// Save to files
	saveToHTMLFile(outHTML, outFolder, outFileName);
	saveToJSONFile(JSON.stringify(manifest), outFolder, outManifestName);

	return {
		documents: [outFileName, outManifestName],
		outFolder: outFolderName,
		outFolderURL: outFolder.getUrl()
	};
}
