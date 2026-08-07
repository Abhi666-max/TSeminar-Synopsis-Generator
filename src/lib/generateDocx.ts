import { Document, Paragraph, TextRun, AlignmentType, Table, TableRow, TableCell, WidthType, HeadingLevel } from "docx";
import { paperData } from "./paperData";

export interface StudentInfo {
  name: string;
  rollNo: string;
  prn: string;
  division: string;
  batch: string;
  seminarTitle: string;
}

export const generateDocx = async (studentInfo: StudentInfo) => {
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({ text: "SHALAKA FOUNDATION’S", bold: true, size: 28 }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({ text: "KEYSTONE SCHOOL OF ENGINEERING", bold: true, size: 36 }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({ text: "DEPARTMENT OF COMPUTER ENGINEERING", bold: true, size: 28 }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({ text: "Keystone School of Engineering, Near Handewadi Chowk, Uruli Devachi, Pune– 412308", size: 22 }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({ text: "www.keystoneschoolofengineering.com", size: 22 }),
            ],
          }),
          new Paragraph({ text: "" }),
          
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({ text: "A.Y. 2026-27\t\t\tSem-I\t\t\tYear: TE", size: 24 }),
            ],
            tabStops: [
              { type: "center", position: 4500 },
              { type: "right", position: 9000 },
            ],
          }),
          
          new Paragraph({ text: "" }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({ text: "Technical Seminar", size: 28 }),
            ],
          }),
          
          new Paragraph({ text: "" }),
          new Paragraph({ text: "" }),
          
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({ text: "TECHNICAL SEMINAR TITLE SUBMISSION", bold: true, size: 28, color: "000000" }),
            ],
          }),
          
          new Paragraph({ text: "" }),
          
          new Paragraph({
            heading: HeadingLevel.HEADING_3,
            children: [
              new TextRun({ text: "1. Seminar Title", bold: true, size: 24 }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: "Title of Seminar Title: ", bold: true }),
              new TextRun({ text: studentInfo.seminarTitle }),
            ],
          }),
          
          new Paragraph({ text: "" }),
          
          new Paragraph({
            heading: HeadingLevel.HEADING_3,
            children: [
              new TextRun({ text: "2. Research Paper Details", bold: true, size: 24 }),
            ],
          }),
          new Paragraph({ text: "• Authors: " + paperData.authors }),
          new Paragraph({ text: "• Conference/Journal: " + paperData.conference }),
          new Paragraph({ text: "• Year: " + paperData.year }),
          new Paragraph({ text: "• DOI: " + paperData.doi }),
          
          new Paragraph({ text: "" }),
          
          new Paragraph({
            heading: HeadingLevel.HEADING_3,
            children: [
              new TextRun({ text: "3. Introduction", bold: true, size: 24 }),
            ],
          }),
          new Paragraph({ text: paperData.introduction }),
          
          new Paragraph({ text: "" }),
          
          new Paragraph({
            heading: HeadingLevel.HEADING_3,
            children: [
              new TextRun({ text: "4. Problem Statement", bold: true, size: 24 }),
            ],
          }),
          new Paragraph({ text: paperData.problemStatement }),
          
          new Paragraph({ text: "" }),
          
          new Paragraph({
            heading: HeadingLevel.HEADING_3,
            children: [
              new TextRun({ text: "5. Objectives", bold: true, size: 24 }),
            ],
          }),
          ...paperData.objectives.map((obj) => new Paragraph({ text: "• " + obj })),
          
          new Paragraph({ text: "" }),
          
          new Paragraph({
            heading: HeadingLevel.HEADING_3,
            children: [
              new TextRun({ text: "6. Proposed Methodology", bold: true, size: 24 }),
            ],
          }),
          new Paragraph({ text: paperData.proposedMethodology }),
          
          new Paragraph({ text: "" }),
          
          new Paragraph({
            heading: HeadingLevel.HEADING_3,
            children: [
              new TextRun({ text: "7. Technologies Used", bold: true, size: 24 }),
            ],
          }),
          ...paperData.technologiesUsed.map((tech) => new Paragraph({ text: "• " + tech })),
          
          new Paragraph({ text: "" }),
          
          new Paragraph({
            heading: HeadingLevel.HEADING_3,
            children: [
              new TextRun({ text: "8. Applications", bold: true, size: 24 }),
            ],
          }),
          ...paperData.applications.map((app) => new Paragraph({ text: "• " + app })),
          
          new Paragraph({ text: "" }),
          
          new Paragraph({
            heading: HeadingLevel.HEADING_3,
            children: [
              new TextRun({ text: "9. Advantages", bold: true, size: 24 }),
            ],
          }),
          ...paperData.advantages.map((adv) => new Paragraph({ text: "• " + adv })),
          
          new Paragraph({ text: "" }),
          
          new Paragraph({
            heading: HeadingLevel.HEADING_3,
            children: [
              new TextRun({ text: "10. Limitations", bold: true, size: 24 }),
            ],
          }),
          ...paperData.limitations.map((lim) => new Paragraph({ text: "• " + lim })),
          
          new Paragraph({ text: "" }),
          
          new Paragraph({
            heading: HeadingLevel.HEADING_3,
            children: [
              new TextRun({ text: "11. Future Scope", bold: true, size: 24 }),
            ],
          }),
          ...paperData.futureScope.map((fs) => new Paragraph({ text: "• " + fs })),
          
          new Paragraph({ text: "" }),
          
          new Paragraph({
            heading: HeadingLevel.HEADING_3,
            children: [
              new TextRun({ text: "12. Results", bold: true, size: 24 }),
            ],
          }),
          new Paragraph({ text: paperData.results }),
          
          new Paragraph({ text: "" }),
          
          new Paragraph({
            heading: HeadingLevel.HEADING_3,
            children: [
              new TextRun({ text: "13. Conclusion", bold: true, size: 24 }),
            ],
          }),
          new Paragraph({ text: paperData.conclusion }),
          
          new Paragraph({ text: "" }),
          
          new Paragraph({
            heading: HeadingLevel.HEADING_3,
            children: [
              new TextRun({ text: "14. References", bold: true, size: 24 }),
            ],
          }),
          new Paragraph({ text: paperData.references }),
          
          new Paragraph({ text: "" }),
          
          new Paragraph({
            heading: HeadingLevel.HEADING_3,
            children: [
              new TextRun({ text: "15. Student Details", bold: true, size: 24 }),
            ],
          }),
          new Paragraph({ text: "" }),
          
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph({ text: "Roll No", alignment: AlignmentType.CENTER })], width: { size: 20, type: WidthType.PERCENTAGE } }),
                  new TableCell({ children: [new Paragraph({ text: "Name of Student", alignment: AlignmentType.CENTER })], width: { size: 60, type: WidthType.PERCENTAGE } }),
                  new TableCell({ children: [new Paragraph({ text: "PRN", alignment: AlignmentType.CENTER })], width: { size: 20, type: WidthType.PERCENTAGE } }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph({ text: studentInfo.rollNo, alignment: AlignmentType.CENTER })] }),
                  new TableCell({ children: [new Paragraph({ text: studentInfo.name, alignment: AlignmentType.CENTER })] }),
                  new TableCell({ children: [new Paragraph({ text: studentInfo.prn, alignment: AlignmentType.CENTER })] }),
                ],
              }),
            ],
          }),
          
          new Paragraph({ text: "" }),
          new Paragraph({ text: "" }),
          
          new Paragraph({
            children: [
              new TextRun({ text: "Faculty Use Only", bold: true, size: 24 }),
            ],
          }),
          
          new Paragraph({ text: "" }),
          new Paragraph({
            children: [
              new TextRun({ text: "● Title Status: " }),
              new TextRun({ text: "☐ Approved ☐ Approved with Modification ☐ Not Approved" }),
            ]
          }),
          new Paragraph({
            children: [
              new TextRun({ text: "● Remarks (if any): " }),
            ]
          }),
          
          new Paragraph({ text: "" }),
          new Paragraph({ text: "" }),
          
          new Paragraph({
            children: [
              new TextRun({ text: "Faculty Signature: ______________________", bold: true }),
            ]
          }),
          new Paragraph({
            children: [
              new TextRun({ text: "Date: ______________________", bold: true }),
            ]
          }),
          
          new Paragraph({ text: "" }),
          new Paragraph({ text: "_________________________________________________________________________________" }),
          new Paragraph({ text: "Bottom of Form", alignment: AlignmentType.CENTER }),
        ],
      },
    ],
  });

  return doc;
};
