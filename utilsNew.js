/*
function saveAsPDF(docFile, fileName) {
  const docDoc = DocumentApp.openById(docFile.getId());
  var pdfFile = DriveApp.createFile(docDoc.getAs("application/pdf"));
  pdfFile.setName(fileName+".pdf");
  var fileParents = docFile.getParents();
  var folder
  while ( fileParents.hasNext() ) {
    folder = fileParents.next();
  }
  pdfFile.moveTo(folder);
}

function applyExportPDF(document) {
  const docID = document.getId();
  const docFile = DriveApp.getFileById(docID);
  const fileName = docFile.getName();
  const tmpFile = docFile.makeCopy("tmp_"+fileName); //TODO: Genero nuovo invece che fare copia potrebbe sistemare formattazione
  const tmpDoc = DocumentApp.openById(tmpFile.getId());
  const docBody = tmpDoc.getBody().editAsText();

  const fakePayload = "0101010001100101011110000111010000100000011101110110000101110100011001010111001001101101011000010111001001101011011010010110111001100111001000000110100101110011001000000110000101110111011001010111001101101111011011010110010100100001";
  const originalText = tmpDoc.getBody().getText();
  console.log(originalText);
  const watermarkedBody = WatermarkingTools.encodeText(originalText, fakePayload);
  console.log(watermarkedBody);
  docBody.setText(watermarkedBody);


  //docBody.setText(tmpDoc.getBody().editAsText().getText());
  docBody.setFontFamily('Arial');
  docBody.setFontSize(11);
  docBody.setTextAlignment(DocumentApp.TextAlignment.NORMAL);

  var pars = tmpDoc.getBody().getParagraphs();
  pars.forEach(par => par.setAlignment(DocumentApp.HorizontalAlignment.LEFT));

  tmpDoc.saveAndClose();

  saveAsPDF(tmpFile, docFile.getName());
  //tmpFile.setTrashed(true);
}

function testApply() {
  const doc = DocumentApp.openById("1JUhzMh3RAOVqns21JaIAWl-hD3Isz869YmbGb15pAH8");
  applyExportPDF(doc);
}*/