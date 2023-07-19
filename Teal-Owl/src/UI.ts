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