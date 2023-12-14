import { WatermarkingTools } from "./watermarkingTools";

/**
 * This module contains functions that are specific to Google Apps Script. It is separated from the main module to avoid the need of installing Google Apps Script types in all projects
 */
export module WatermarkingToolsGAS {
  type TreeStruct = {
    content: GoogleAppsScript.Document.Element;
    text?: string;
    children: TreeStruct[];
    type: GoogleAppsScript.Document.ElementType; //TODO: Remove this after testing
  };

  export function encodeTree(tree: TreeStruct[], binaryCode: string) {
    // Iterator index for binary code
    let binIter = 0;

    // Iterate over the tree and apply the watermark to each text
    for (const text of tree) {
      if (text.text === undefined) continue;

      // Encode the text
      const encoded = WatermarkingTools.encodeString(
        text.text,
        binaryCode,
        binIter
      );

      text.text = encoded.outText;
      binIter = encoded.binIter;
    }
  }
}
