import { NextResponse } from 'next/server';
import Groq from 'groq-sdk';


const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const titleOnly = formData.get('title') as string | null;
    
    if (!file && !titleOnly) {
      return NextResponse.json({ error: 'Please provide either a PDF file or a Title' }, { status: 400 });
    }

    let prompt = '';

    if (file && file.type === 'application/pdf') {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      
      // Polyfill DOMMatrix for pdf-parse (pdf.js dependency)
      if (typeof global.DOMMatrix === 'undefined') {
        global.DOMMatrix = class DOMMatrix {
          constructor() {}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as any;
      }
      
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const pdfParse = require('pdf-parse');
      const pdfData = await pdfParse(buffer);
      const textContent = pdfData.text;

      prompt = `
      You are an expert academic assistant. I am providing you with the text extracted from a research paper. 
      Read the paper and extract the following information EXACTLY in this JSON format.
      
      Format:
      {
        "title": "Full title of the paper",
        "authors": "Comma separated list of authors",
        "conference": "Conference or Journal Name",
        "year": "Publication Year",
        "doi": "DOI link or number",
        "introduction": "1-paragraph summary.",
        "problemStatement": "1-paragraph summary.",
        "objectives": ["Obj 1", "Obj 2", "Obj 3", "Obj 4"],
        "methodology": "1-paragraph summary.",
        "technologies": ["Tech 1", "Tech 2", "Tech 3", "Tech 4"],
        "results": "1-paragraph summary.",
        "conclusion": "1-paragraph summary."
      }

      Paper Text:
      ${textContent.substring(0, 15000)}
      `;
    } else if (titleOnly) {
      prompt = `
      You are an expert academic assistant. A student wants to generate a Technical Seminar Synopsis based ONLY on the following title: "${titleOnly}".
      Generate highly realistic and highly technical content for a research paper published in the last 5 years that perfectly matches this title.
      Invent realistic authors, a prestigious IEEE/Springer journal name, a recent year (2020-2024), and a realistic DOI.
      
      Return the output EXACTLY in this JSON format.
      {
        "title": "${titleOnly}",
        "authors": "Invented Authors (e.g., John Doe, Jane Smith)",
        "conference": "Invented Journal/Conference",
        "year": "2023",
        "doi": "10.xxxx/xxxxx",
        "introduction": "A realistic, highly technical 1-paragraph introduction.",
        "problemStatement": "A realistic, highly technical 1-paragraph problem statement.",
        "objectives": ["Objective 1", "Objective 2", "Objective 3", "Objective 4"],
        "methodology": "A realistic, highly technical 1-paragraph methodology.",
        "technologies": ["Tech 1", "Tech 2", "Tech 3", "Tech 4"],
        "results": "A realistic, highly technical 1-paragraph results summary.",
        "conclusion": "A realistic, highly technical 1-paragraph conclusion."
      }
      `;
    } else {
       return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a precise JSON data generator. You ONLY output valid JSON. No preamble."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      model: "llama-3.1-8b-instant", 
      temperature: 0.3,
      response_format: { type: 'json_object' }
    });

    const result = completion.choices[0]?.message?.content;
    
    if (!result) {
      throw new Error("Internal AI API returned empty response");
    }

    const jsonData = JSON.parse(result);
    return NextResponse.json(jsonData);

  } catch (error: unknown) {
    console.error('Error in extraction API:', error);
    let errorMessage = 'Failed to generate synopsis';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
