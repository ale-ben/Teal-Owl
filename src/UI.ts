import {Utils} from "./Utils";
import {Config} from "./Config";

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
	if (Config.checkConfig()) {
		const outFile = Utils.applyExport(DocumentApp.getActiveDocument());
		ui.alert("Watermark applied correctly. Output file: " + outFile.getName() + ". Location: " + outFile.getUrl());
	} else {
		ui.alert("Please run config in the watermarking menu.");
	}
}

function validateConfigButton() {
	const ui = DocumentApp.getUi();
	if (Config.checkConfig()) {
		ui.alert("Config is valid.");
	} else {
		ui.alert("Config is invalid.");
	}
}

function viewConfigButton() {
	const ui = DocumentApp.getUi();

	ui.alert("User ID: " + Config.getUserID());
}

function resetConfigButton() {
	const ui = DocumentApp.getUi();

	Config.resetConfig();
	ui.alert("Config reset.");
}

function openConfigButton() {
	const ui = DocumentApp.getUi();

	const userID = Config.getUserID();

	var userIDPrompt = ui.prompt("Please enter your user ID", "Current user ID is: " + userID, ui.ButtonSet.OK_CANCEL);
	if (userIDPrompt.getSelectedButton() == ui.Button.OK && userIDPrompt.getResponseText() != "") {
		Config.setUserID(userIDPrompt.getResponseText());
		ui.alert("User ID updated, new user ID: " + userIDPrompt.getResponseText());
	}
}
