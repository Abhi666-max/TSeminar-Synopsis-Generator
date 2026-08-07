import { PDFDocument, rgb, StandardFonts, PDFFont } from 'pdf-lib';

export interface RoboticsStudentDetails {
  rollNo: string;
  name: string;
  prn: string;
}

export interface RoboticsPaperData {
  title: string;
  problemStatement: string;
  projectDescription: string;
  hardwareComponents: string[];
  expectedOutcome: string;
}

export async function generateRoboticsPdf(students: RoboticsStudentDetails[], paper: RoboticsPaperData) {
  const response = await fetch('/robotics_format.pdf');
  const existingPdfBytes = await response.arrayBuffer();

  const pdfDoc = await PDFDocument.load(existingPdfBytes);
  const font = await pdfDoc.embedFont(StandardFonts.TimesRoman);
  const boldFont = await pdfDoc.embedFont(StandardFonts.TimesRomanBold);
  const italicFont = await pdfDoc.embedFont(StandardFonts.TimesRomanItalic);
  
  const timesRoman = font;
  const timesRomanBold = boldFont;
  const timesRomanItalic = italicFont;
  
  const pages = pdfDoc.getPages();
  const page1 = pages[0];
  const { width, height } = page1.getSize();
  const margin = 50;

  // Clear existing template body text (from Y=50 up to Y=760) to allow dynamic reflow
  page1.drawRectangle({ x: 0, y: 50, width: width, height: 710, color: rgb(1, 1, 1) });
  
  // Clear Page 2 body text to prevent overlap with header logo
  if (pages[1]) {
    pages[1].drawRectangle({ x: 0, y: 50, width: width, height: 715, color: rgb(1, 1, 1) });
  }

  const fontSize = 12; // increased for better readability
  const headingSize = 12;
  const lineSpacing = 22; // ideal spacing
  const sectionSpacing = 16;
  const bottomMargin = 60;

  let currentPage = page1;
  let cursorY = 740;
  let currentPageIndex = 0;

  function checkPageBreak(requiredSpace: number) {
    if (cursorY - requiredSpace < bottomMargin) {
      currentPageIndex++;
      let newPage = pdfDoc.getPages()[currentPageIndex];
      if (!newPage) {
        newPage = pdfDoc.addPage();
        newPage.drawRectangle({ x: 0, y: 0, width: width, height: height - 120, color: rgb(1, 1, 1) });
      }
      currentPage = newPage;
      cursorY = height - 140; // Start lower on page 2 to avoid header logo
    }
  }

  function printJustifiedText(text: string, x: number, fontToUse: PDFFont, sizeToUse: number, maxWidth: number, color = rgb(0,0,0), endSpacing = sectionSpacing, justify = true) {
    const paragraphs = text.split('\n').filter(p => p.trim() !== '');
    
    for (let p = 0; p < paragraphs.length; p++) {
      const paragraph = paragraphs[p];
      const words = paragraph.split(' ').filter(w => w !== '');
      let line: string[] = [];
      let lineLength = 0;

      for (let n = 0; n < words.length; n++) {
        const word = words[n];
        const wordWidth = fontToUse.widthOfTextAtSize(word, sizeToUse);
        const spaceWidth = fontToUse.widthOfTextAtSize(' ', sizeToUse);
        const testLineLength = lineLength + (line.length > 0 ? spaceWidth : 0) + wordWidth;

        if (testLineLength > maxWidth && line.length > 0) {
          checkPageBreak(lineSpacing);
          if (justify) {
            const totalWordsWidth = line.reduce((acc, w) => acc + fontToUse.widthOfTextAtSize(w, sizeToUse), 0);
            const remainingSpace = maxWidth - totalWordsWidth;
            const spaceBetweenWords = line.length > 1 ? remainingSpace / (line.length - 1) : 0;

            let currentX = x;
            for (const w of line) {
              currentPage.drawText(w, { x: currentX, y: cursorY, size: sizeToUse, font: fontToUse, color });
              currentX += fontToUse.widthOfTextAtSize(w, sizeToUse) + spaceBetweenWords;
            }
          } else {
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

      if (line.length > 0) {
        checkPageBreak(lineSpacing);
        let currentX = x;
        const spaceWidth = fontToUse.widthOfTextAtSize(' ', sizeToUse);
        for (const w of line) {
          currentPage.drawText(w, { x: currentX, y: cursorY, size: sizeToUse, font: fontToUse, color });
          currentX += fontToUse.widthOfTextAtSize(w, sizeToUse) + spaceWidth;
        }
        
        if (p === paragraphs.length - 1) cursorY -= endSpacing;
        else cursorY -= lineSpacing;
      }
    }
  }

  function printHeading(text: string) {
    cursorY -= 4;
    checkPageBreak(lineSpacing);
    currentPage.drawText(text, { x: margin, y: cursorY, size: headingSize, font: boldFont, color: rgb(0.1, 0.3, 0.7) });
    cursorY -= lineSpacing;
  }

  // --- Start Drawing Content ---

  // 1. Header Information (Times Roman)
  currentPage.drawText('A.Y. 2026-27', { x: margin + 30, y: cursorY, size: 14, font: timesRoman });
  currentPage.drawText('Sem-I', { x: (width / 2) - 20, y: cursorY, size: 14, font: timesRoman });
  currentPage.drawText('Year:TE', { x: width - margin - 100, y: cursorY, size: 14, font: timesRoman });
  cursorY -= 30;

  const title1 = 'Robotics & Automation';
  currentPage.drawText(title1, { x: (width - timesRoman.widthOfTextAtSize(title1, 16)) / 2, y: cursorY, size: 16, font: timesRoman });
  cursorY -= 40;

  const title2 = 'MINI PROJECT TITLE SUBMISSION FORMAT';
  currentPage.drawText(title2, { x: (width - timesRomanBold.widthOfTextAtSize(title2, 12)) / 2, y: cursorY, size: 12, font: timesRomanBold, color: rgb(0.1, 0.3, 0.7) });
  cursorY -= 15;

  const title3 = '(Hardcopy)';
  currentPage.drawText(title3, { x: (width - timesRomanItalic.widthOfTextAtSize(title3, 11)) / 2, y: cursorY, size: 11, font: timesRomanItalic });
  cursorY -= 30;

  // Sections
  printHeading('1. Project Title');
  checkPageBreak(lineSpacing);
  currentPage.drawText('Title of Mini Project:', { x: margin, y: cursorY, size: fontSize, font: boldFont });
  printJustifiedText(` ${paper.title}`, margin + 120, font, fontSize, width - margin - 170, rgb(0,0,0), sectionSpacing, false);
  
  printHeading('2. Problem Statement');
  // Removed instruction text drawing, printing content immediately
  printJustifiedText(paper.problemStatement, margin, font, fontSize, width - 2 * margin);

  printHeading('3. Project Description');
  // Removed instruction text drawing, printing content immediately
  printJustifiedText(paper.projectDescription, margin, font, fontSize, width - 2 * margin);
  
  // --- Student Details Table ---
  printHeading('4. Group Details');
  checkPageBreak(lineSpacing);
  currentPage.drawText('Group Size:', { x: margin, y: cursorY, size: fontSize, font: boldFont });
  currentPage.drawText(' 3 Students', { x: margin + 65, y: cursorY, size: fontSize, font: font });
  cursorY -= lineSpacing + 10;
  
  checkPageBreak(120);
  const tableTop = cursorY;
  const rowHeight = 25;
  const tableHeight = rowHeight * 4; // Header + 3 students
  const col2X = margin + 100;
  const col3X = margin + 350;
  const tableW = width - 2 * margin;
  
  currentPage.drawRectangle({ x: margin, y: tableTop - tableHeight, width: tableW, height: tableHeight, borderColor: rgb(0,0,0), borderWidth: 1 });
  
  for (let i = 1; i < 4; i++) {
    currentPage.drawLine({ start: { x: margin, y: tableTop - (i * rowHeight) }, end: { x: margin + tableW, y: tableTop - (i * rowHeight) }, thickness: 1, color: rgb(0,0,0) });
  }
  
  currentPage.drawLine({ start: { x: col2X, y: tableTop }, end: { x: col2X, y: tableTop - tableHeight }, thickness: 1, color: rgb(0,0,0) });
  currentPage.drawLine({ start: { x: col3X, y: tableTop }, end: { x: col3X, y: tableTop - tableHeight }, thickness: 1, color: rgb(0,0,0) });
  
  currentPage.drawText('Roll No', { x: margin + 30, y: tableTop - 16, size: fontSize, font: boldFont });
  currentPage.drawText('Name of Student', { x: col2X + 70, y: tableTop - 16, size: fontSize, font: boldFont });
  currentPage.drawText('PRN', { x: col3X + 40, y: tableTop - 16, size: fontSize, font: boldFont });

  for (let i = 0; i < 3; i++) {
    const s = students[i];
    if (!s) continue;
    const yPos = tableTop - 16 - ((i + 1) * rowHeight);
    currentPage.drawText(s.rollNo, { x: margin + 40, y: yPos, size: fontSize, font });
    currentPage.drawText(s.name, { x: col2X + 20, y: yPos, size: fontSize, font });
    currentPage.drawText(s.prn, { x: col3X + 20, y: yPos, size: fontSize, font });
  }

  cursorY -= tableHeight + 20;

  printHeading('5. Hardware Components Required');
  // Removed instruction text drawing, printing content immediately
  for (const item of paper.hardwareComponents) {
    checkPageBreak(lineSpacing);
    currentPage.drawText('•', { x: margin + 10, y: cursorY, size: fontSize, font });
    // Passed lineSpacing as endSpacing so bullet points don't overlap
    printJustifiedText(item, margin + 20, font, fontSize, width - margin - 70, rgb(0,0,0), lineSpacing, true);
  }
  cursorY -= sectionSpacing; // Add section spacing after the list

  printHeading('6. Expected Outcome');
  // Removed instruction text drawing, printing content immediately
  printJustifiedText(paper.expectedOutcome, margin, font, fontSize, width - 2 * margin);

  // Student Signatures
  checkPageBreak(120);
  currentPage.drawText('Student Signatures', { x: margin, y: cursorY, size: headingSize, font: boldFont });
  cursorY -= lineSpacing + 5;
  
  const sigTableTop = cursorY;
  const sigTableHeight = rowHeight * 4; 
  const sigTableW = 280;
  const sigCol2X = margin + 160;
  
  currentPage.drawRectangle({ x: margin, y: sigTableTop - sigTableHeight, width: sigTableW, height: sigTableHeight, borderColor: rgb(0,0,0), borderWidth: 1 });
  
  for (let i = 1; i < 4; i++) {
    currentPage.drawLine({ start: { x: margin, y: sigTableTop - (i * rowHeight) }, end: { x: margin + sigTableW, y: sigTableTop - (i * rowHeight) }, thickness: 1, color: rgb(0,0,0) });
  }
  currentPage.drawLine({ start: { x: sigCol2X, y: sigTableTop }, end: { x: sigCol2X, y: sigTableTop - sigTableHeight }, thickness: 1, color: rgb(0,0,0) });
  
  currentPage.drawText('Name', { x: margin + 65, y: sigTableTop - 16, size: fontSize, font: boldFont });
  currentPage.drawText('Signature', { x: sigCol2X + 35, y: sigTableTop - 16, size: fontSize, font: boldFont });
  
  // Populate student names in signature table
  for (let i = 0; i < 3; i++) {
    const s = students[i];
    if (!s) continue;
    const yPos = sigTableTop - 16 - ((i + 1) * rowHeight);
    currentPage.drawText(s.name, { x: margin + 10, y: yPos, size: fontSize, font });
  }

  cursorY -= sigTableHeight + 20;

  // Faculty Use Only
  checkPageBreak(120);
  currentPage.drawText('Faculty Use Only', { x: margin, y: cursorY, size: headingSize, font: boldFont });
  cursorY -= lineSpacing + 10;
  currentPage.drawText('•', { x: margin + 10, y: cursorY, size: fontSize, font: boldFont });
  // Draw custom checkboxes for Title Status
  const drawCheckbox = (cx: number, cy: number) => {
    currentPage.drawRectangle({ x: cx, y: cy, width: 10, height: 10, borderColor: rgb(0,0,0), borderWidth: 1 });
  };
  
  currentPage.drawText('Title Status:', { x: margin + 25, y: cursorY, size: fontSize, font: boldFont });
  drawCheckbox(margin + 95, cursorY);
  currentPage.drawText('Approved', { x: margin + 110, y: cursorY, size: fontSize, font: font });
  drawCheckbox(margin + 175, cursorY);
  currentPage.drawText('Approved with Modification', { x: margin + 190, y: cursorY, size: fontSize, font: font });
  drawCheckbox(margin + 345, cursorY);
  currentPage.drawText('Not Approved', { x: margin + 360, y: cursorY, size: fontSize, font: font });
  cursorY -= lineSpacing + 5;
  currentPage.drawText('•', { x: margin + 10, y: cursorY, size: fontSize, font: boldFont });
  currentPage.drawText('Remarks (if any):', { x: margin + 25, y: cursorY, size: fontSize, font: boldFont });
  cursorY -= 40;
  
  checkPageBreak(80);
  currentPage.drawText('Faculty Signature: ______________________', { x: margin, y: cursorY, size: fontSize, font: boldFont });
  cursorY -= lineSpacing + 10;
  currentPage.drawText('Date: __________________', { x: margin, y: cursorY, size: fontSize, font: boldFont });
  cursorY -= 20;

  // Remove trailing blank pages from template
  const finalPages = pdfDoc.getPageCount();
  for (let i = finalPages - 1; i > currentPageIndex; i--) {
    pdfDoc.removePage(i);
  }

  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([new Uint8Array(pdfBytes)], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `Robotics_${paper.title.substring(0, 30).replace(/[^a-zA-Z0-9]/g, '_')}.pdf`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
