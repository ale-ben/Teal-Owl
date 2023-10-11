import { Manifest } from "./Manifest";
import { Parser } from "./Parser";
import {Payload} from "./Payload";
import { WatermarkingTools } from "./TOW/watermarkingTools";
import {Utils} from "./Utils";

"use strict";
function doGet() {
	try {
		return HtmlService
		.createTemplateFromFile("src/webpage/index")
		.evaluate()
	} catch (e:any) {
		// TODO (Developer) - Handle exception
		console.log("Failed with error: %s", e.error);
		return HtmlService.createHtmlOutput(e.error);
	}
}

function include(filename: string) {
	return HtmlService.createHtmlOutputFromFile(filename)
		.getContent();
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
	} catch (e:any) {
	  // TODO (Developer) - Handle exception
	  console.log('Failed with error: %s', e.error);
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
			home: DriveApp.getRootFolder().getId(),
			// TODO (Developer) - Add more info
		}
	} catch (e:any) {
		// TODO (Developer) - Handle exception
		console.log('Failed with error: %s', e.error);
	}
}

function applyWatermark(documentID: string) {
	// Basic info and paths 
	const authorID = Session.getActiveUser().getEmail();
	const doc = DocumentApp.openById(documentID);
	const docFolder = DriveApp.getFileById(documentID).getParents().next();
	
	const outFolderName = doc.getName() + "_watermarked";
	const outFileName = doc.getName() + "_watermark";
	const outManifestName = doc.getName() + "_manifest";

	const outFolder = docFolder.createFolder(outFolderName);

	// Generate the payload
	const payload = Payload.GeneratePayload(authorID, documentID);
	const payloadStr = Payload.StringToBinStr(payload);

	// Generate out html
	const outHTML = Utils.applyWatermark(doc, payloadStr);
	
	// Generate manifest
	// Convert HTML back to string
	const htmlStr = Parser.HTMLToText(outHTML);
	const rawText = WatermarkingTools.extractRawText(htmlStr);
	const manifest = Manifest.GenerateManifest(authorID, documentID, doc.getName(), rawText);

	// Save to files
	Utils.saveToHTMLFile(outHTML, outFolder, outFileName);
	Utils.saveToJSONFile(JSON.stringify(manifest), outFolder, outManifestName);

	return {
		documents: [outFileName, outManifestName],
		outFolder: outFolderName,
		outFolderURL: outFolder.getUrl(),
	}
}