import {Utils} from "./Utils";

function onOpen() {
	var ui = DocumentApp.getUi();

	const mainDropdown = ui.createMenu("Watermarking Tools");

	const watermarkingMenu = ui.createMenu("Apply watermark");
	watermarkingMenu.addItem("Apply and export to PDF", "applyExportPDFButton");

	mainDropdown.addSubMenu(watermarkingMenu);

	mainDropdown.addSeparator();

	const configMenu = ui.createMenu("Config");
	configMenu.addItem("Set config", "openConfigButton");
	configMenu.addItem("View config", "viewConfigButton");
	configMenu.addItem("Validate config", "validateConfigButton");
	configMenu.addItem("Reset config", "resetConfigButton");
	mainDropdown.addSubMenu(configMenu);

	mainDropdown.addToUi();
}

function applyExportPDFButton() {
	const ui = DocumentApp.getUi();
	if (checkConfig()) {
		const outFile = Utils.applyExport(DocumentApp.getActiveDocument());
		ui.alert("Watermark applied correctly. Output file: " + outFile.getName() + ". Location: " + outFile.getUrl());
	} else {
		ui.alert("Please run config in the watermarking menu.");
	}
}

function checkConfig(): boolean {
	const userProperties = PropertiesService.getUserProperties();
	return userProperties.getProperty("userID") != null && userProperties.getProperty("userID") != "";
}

function validateConfigButton() {
	const ui = DocumentApp.getUi();
	if (checkConfig()) {
		ui.alert("Config is valid.");
	} else {
		ui.alert("Config is invalid.");
	}
}

function viewConfigButton() {
	const userProperties = PropertiesService.getUserProperties();
	const ui = DocumentApp.getUi();

	const userID = userProperties.getProperty("userID");

	ui.alert("User ID: " + (
		userID
			? userID
			: ""
	));
}

function resetConfigButton() {
	const userProperties = PropertiesService.getUserProperties();
	const ui = DocumentApp.getUi();

	userProperties.deleteAllProperties();
	ui.alert("Config reset.");
}

function openConfigButton() {
	const userProperties = PropertiesService.getUserProperties();
	const ui = DocumentApp.getUi();

	const userID = userProperties.getProperty("userID");

	var userIDPrompt = ui.prompt("Please enter your user ID", "Current user ID is: " + (
		userID
			? userID
			: ""
	), ui.ButtonSet.OK_CANCEL);
	if (userIDPrompt.getSelectedButton() == ui.Button.OK && userIDPrompt.getResponseText() != "") {
		userProperties.setProperty("userID", userIDPrompt.getResponseText());
		ui.alert("User ID updated, new user ID: " + userIDPrompt.getResponseText());
	}
}
