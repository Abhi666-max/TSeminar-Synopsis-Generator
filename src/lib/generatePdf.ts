import { PDFDocument, rgb, StandardFonts, PDFFont } from 'pdf-lib';

export interface StudentDetails {
  rollNo: string;
  name: string;
  prn: string;
}

export interface PaperData {
  title: string;
  authors: string;
  conference: string;
  year: string;
  doi: string;
  introduction: string;
  problemStatement: string;
  objectives: string[];
  methodology: string;
  technologies: string[];
  results: string;
  conclusion: string;
}

export async function generateFinalPdf(student: StudentDetails, paper: PaperData) {
  // Fetch the template PDF from the public folder
  const response = await fetch('/seminar_format.pdf');
  const existingPdfBytes = await response.arrayBuffer();

  const pdfDoc = await PDFDocument.load(existingPdfBytes);
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  
  const pages = pdfDoc.getPages();
  const page1 = pages[0];
  let page2 = pages[1];
  if (!page2) {
    page2 = pdfDoc.addPage();
  }
  
  const { width, height } = page1.getSize();
  const margin = 50;
  
  page1.drawRectangle({ x: 0, y: 0, width: width, height: height - 190, color: rgb(1, 1, 1) });
  page2.drawRectangle({ x: 0, y: 0, width: width, height: height - 125, color: rgb(1, 1, 1) });

  const fontSize = 11;
  const headingSize = 12;
  const lineSpacing = 18;
  const sectionSpacing = 16;
  const bottomMargin = 60;
  const page2StartY = height - 145;

  let currentPage = page1;
  let cursorY = height - 195;

  function checkPageBreak(requiredSpace: number) {
    if (cursorY - requiredSpace < bottomMargin) {
      if (currentPage === page1) {
        currentPage = page2;
        cursorY = page2StartY;
      }
    }
  }

  function printJustifiedText(text: string, x: number, fontToUse: PDFFont, sizeToUse: number, maxWidth: number, color = rgb(0,0,0), endSpacing = sectionSpacing, justify = true) {
    const paragraphs = text.split('\\n').filter(p => p.trim() !== '');
    
    for (let p = 0; p < paragraphs.length; p++) {
      const paragraph = paragraphs[p];
      const words = paragraph.split(' ').filter(w => w !== '');
      let line: string[] = [];
      let lineLength = 0;

      for (let n = 0; n < words.length; n++) {
        const word = words[n];
        const wordWidth = fontToUse.widthOfTextAtSize(word, sizeToUse);
        const spaceWidth = fontToUse.widthOfTextAtSize(' ', sizeToUse);

        // If a single word is longer than maxWidth (e.g. very long URL), we still have to draw it,
        // but it will overflow. It's a rare edge case.
        const testLineLength = lineLength + (line.length > 0 ? spaceWidth : 0) + wordWidth;

        if (testLineLength > maxWidth && line.length > 0) {
          checkPageBreak(lineSpacing);
          
          if (justify) {
            // Draw justified line
            const totalWordsWidth = line.reduce((acc, w) => acc + fontToUse.widthOfTextAtSize(w, sizeToUse), 0);
            const remainingSpace = maxWidth - totalWordsWidth;
            const spaceBetweenWords = line.length > 1 ? remainingSpace / (line.length - 1) : 0;

            let currentX = x;
            for (const w of line) {
              currentPage.drawText(w, { x: currentX, y: cursorY, size: sizeToUse, font: fontToUse, color });
              currentX += fontToUse.widthOfTextAtSize(w, sizeToUse) + spaceBetweenWords;
            }
          } else {
            // Draw left-aligned line
            let currentX = x;
            for (const w of line) {
              currentPage.drawText(w, { x: currentX, y: cursorY, size: sizeToUse, font: fontToUse, color });
              currentX += fontToUse.widthOfTextAtSize(w, sizeToUse) + spaceWidth;
            }
          }

          line = [word];
          lineLength = wordWidth;
          cursorY -= lineSpacing;
        } else {
          line.push(word);
          lineLength = testLineLength;
        }
      }

      // Draw the last line of the paragraph left-aligned
      if (line.length > 0) {
        checkPageBreak(lineSpacing);
        let currentX = x;
        const spaceWidth = fontToUse.widthOfTextAtSize(' ', sizeToUse);
        for (const w of line) {
          currentPage.drawText(w, { x: currentX, y: cursorY, size: sizeToUse, font: fontToUse, color });
          currentX += fontToUse.widthOfTextAtSize(w, sizeToUse) + spaceWidth;
        }
        
        // Only add endSpacing after the last paragraph, or between paragraphs
        if (p === paragraphs.length - 1) {
          cursorY -= endSpacing;
        } else {
          cursorY -= lineSpacing;
        }
      }
    }
  }

  function printHeading(text: string) {
    cursorY -= 4; // Extra space before heading
    checkPageBreak(lineSpacing);
    currentPage.drawText(text, { x: margin, y: cursorY, size: headingSize, font: boldFont, color: rgb(0.2, 0.4, 0.8) });
    cursorY -= lineSpacing;
  }

  printHeading('1. Seminar Title');
  checkPageBreak(lineSpacing);
  currentPage.drawText('Title of Seminar:', { x: margin, y: cursorY, size: fontSize, font: boldFont });
  // Pass justify=false for the title to prevent weird spacing if title is 2 lines
  printJustifiedText(` ${paper.title}`, margin + 90, font, fontSize, width - margin - 140, rgb(0,0,0), sectionSpacing, false);

  printHeading('2. Research Paper Details');
  checkPageBreak(lineSpacing);
  currentPage.drawText('• Authors:', { x: margin + 10, y: cursorY, size: fontSize, font: boldFont });
  printJustifiedText(` ${paper.authors}`, margin + 65, font, fontSize, width - margin - 115, rgb(0,0,0), lineSpacing, false);
  
  checkPageBreak(lineSpacing);
  currentPage.drawText('• Conference/Journal:', { x: margin + 10, y: cursorY, size: fontSize, font: boldFont });
  printJustifiedText(` ${paper.conference}`, margin + 125, font, fontSize, width - margin - 175, rgb(0,0,0), lineSpacing, false);
  
  checkPageBreak(lineSpacing);
  currentPage.drawText('• Year:', { x: margin + 10, y: cursorY, size: fontSize, font: boldFont });
  currentPage.drawText(` ${paper.year}`, { x: margin + 45, y: cursorY, size: fontSize, font });
  cursorY -= lineSpacing;
  
  checkPageBreak(lineSpacing);
  currentPage.drawText('• DOI:', { x: margin + 10, y: cursorY, size: fontSize, font: boldFont });
  currentPage.drawText(` ${paper.doi}`, { x: margin + 45, y: cursorY, size: fontSize, font });
  cursorY -= sectionSpacing;

  printHeading('3. Introduction');
  printJustifiedText(paper.introduction, margin, font, fontSize, width - 2 * margin);

  printHeading('4. Problem Statement');
  printJustifiedText(paper.problemStatement, margin, font, fontSize, width - 2 * margin);

  printHeading('5. Objectives');
  for (const obj of paper.objectives) {
    checkPageBreak(lineSpacing);
    currentPage.drawText('•', { x: margin + 10, y: cursorY, size: fontSize, font });
    printJustifiedText(obj, margin + 20, font, fontSize, width - margin - 70);
  }

  printHeading('6. Proposed Methodology');
  printJustifiedText(paper.methodology, margin, font, fontSize, width - 2 * margin);
  
  printHeading('7. Technologies Used');
  for (const tech of paper.technologies) {
    checkPageBreak(lineSpacing);
    currentPage.drawText('•', { x: margin + 10, y: cursorY, size: fontSize, font });
    printJustifiedText(tech, margin + 20, font, fontSize, width - margin - 70);
  }

  printHeading('8. Results');
  printJustifiedText(paper.results, margin, font, fontSize, width - 2 * margin);

  printHeading('9. Conclusion');
  printJustifiedText(paper.conclusion, margin, font, fontSize, width - 2 * margin);

  printHeading('10. References');
  const refText = `${paper.authors} (${paper.year}). ${paper.title}. ${paper.conference}. DOI: ${paper.doi}`;
  printJustifiedText(refText, margin, font, fontSize, width - 2 * margin, rgb(0,0,0), sectionSpacing, false);

  printHeading('11. Student Details');
  
  // Table requires block space
  checkPageBreak(50);
  const tableTop = cursorY;
  const tableHeight = 35;
  const col2X = margin + 80;
  const col3X = margin + 350;
  const tableW = width - 2 * margin;
  
  currentPage.drawRectangle({ x: margin, y: tableTop - tableHeight, width: tableW, height: tableHeight, borderColor: rgb(0,0,0), borderWidth: 1 });
  currentPage.drawLine({ start: { x: margin, y: tableTop - 18 }, end: { x: margin + tableW, y: tableTop - 18 }, thickness: 1, color: rgb(0,0,0) });
  currentPage.drawLine({ start: { x: col2X, y: tableTop }, end: { x: col2X, y: tableTop - tableHeight }, thickness: 1, color: rgb(0,0,0) });
  currentPage.drawLine({ start: { x: col3X, y: tableTop }, end: { x: col3X, y: tableTop - tableHeight }, thickness: 1, color: rgb(0,0,0) });
  
  currentPage.drawText('Roll No', { x: margin + 20, y: tableTop - 13, size: fontSize, font: boldFont });
  currentPage.drawText('Name of Student', { x: col2X + 80, y: tableTop - 13, size: fontSize, font: boldFont });
  currentPage.drawText('PRN', { x: col3X + 40, y: tableTop - 13, size: fontSize, font: boldFont });

  currentPage.drawText(student.rollNo, { x: margin + 30, y: tableTop - 30, size: fontSize, font });
  currentPage.drawText(student.name, { x: col2X + 50, y: tableTop - 30, size: fontSize, font });
  currentPage.drawText(student.prn, { x: col3X + 30, y: tableTop - 30, size: fontSize, font });

  cursorY -= 60;

  checkPageBreak(120);
  currentPage.drawText('Faculty Use Only', { x: margin, y: cursorY, size: headingSize, font: boldFont });
  cursorY -= lineSpacing;
  currentPage.drawText('- Title Status:', { x: margin + 10, y: cursorY, size: fontSize, font: boldFont });
  currentPage.drawText('[ ] Approved  [ ] Approved with Modification  [ ] Not Approved', { x: margin + 85, y: cursorY, size: fontSize, font });
  cursorY -= lineSpacing;
  currentPage.drawText('- Remarks (if any):', { x: margin + 10, y: cursorY, size: fontSize, font: boldFont });
  cursorY -= 40;

  currentPage.drawText('Faculty Signature: ______________________', { x: margin, y: cursorY, size: fontSize, font: boldFont });
  cursorY -= lineSpacing + 5;
  currentPage.drawText('Date: ______________________', { x: margin, y: cursorY, size: fontSize, font: boldFont });
  
  const pdfBytes = await pdfDoc.save();
  
  // Create a blob and trigger download
  const blob = new Blob([new Uint8Array(pdfBytes)], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${student.rollNo}_${paper.title.substring(0, 30).replace(/[^a-zA-Z0-9]/g, '_')}.pdf`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
