import {Utils} from "./Utils";

function onOpen() {
	var ui = DocumentApp.getUi();

	const mainDropdown = ui.createMenu("Watermarking Tools");

	const watermarkingMenu = ui.createMenu("Apply watermark");
	watermarkingMenu.addItem("Apply and export to PDF", "applyExportPDFButton");

	mainDropdown.addSubMenu(watermarkingMenu);

	mainDropdown.addSeparator();

	mainDropdown.addItem("Config", "openConfigButton");

	mainDropdown.addToUi();
}

function applyExportPDFButton() {
	const outFile = Utils.applyExport(DocumentApp.getActiveDocument());
	DocumentApp.getUi().alert("Watermark applied correctly. Output file: " + outFile.getName() + ". Location: " + outFile.getUrl());
}

function openConfigButton() {
	DocumentApp.getUi(). // Or DocumentApp or FormApp.
	alert("This should open config popup");
}
