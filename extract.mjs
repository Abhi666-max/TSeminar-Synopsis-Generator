import fs from 'fs';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.js';

async function extractTextWithCoords() {
  const data = new Uint8Array(fs.readFileSync('public/robotics_format.pdf'));
  const doc = await pdfjsLib.getDocument(data).promise;
  
  for (let pageNum = 1; pageNum <= doc.numPages; pageNum++) {
    console.log(`\n--- Page ${pageNum} ---`);
    const page = await doc.getPage(pageNum);
    const content = await page.getTextContent();
    
    for (const item of content.items) {
      if (item.str && item.str.trim() !== '') {
        console.log(`Y: ${item.transform[5].toFixed(2)} | Text: "${item.str}"`);
      }
    }
  }
}

extractTextWithCoords().catch(console.error);
