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
  const tmpFile = docFile.makeCopy("tmp_"+fileName);
  const tmpDoc = DocumentApp.openById(tmpFile.getId());
  const tmpBodyText = tmpDoc.getBody().getText(); // TODO: Convert to editAsText() to preserve formatting?

  const fakePayload = "0101010001100101011110000111010000100000011101110110000101110100011001010111001001101101011000010111001001101011011010010110111001100111001000000110100101110011001000000110000101110111011001010111001101101111011011010110010100100001";
  const watermarkedBody = encodeText(tmpBodyText, fakePayload);
  tmpDoc.getBody().setText(watermarkedBody);
  
  var style = {};
  style[DocumentApp.Attribute.HORIZONTAL_ALIGNMENT] =
    DocumentApp.HorizontalAlignment.RIGHT;
  tmpDoc.getBody().setAttributes(style);
  
  tmpDoc.saveAndClose();

  //saveAsPDF(tmpFile, docFile.getName());
  //tmpFile.setTrashed(true);

}