import { NextResponse } from 'next/server';
import Groq from 'groq-sdk';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.js';
import { ratelimit } from '@/lib/ratelimit';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const titleOnly = formData.get('title') as string | null;
    const subjectType = formData.get('subjectType') as string | null || 'seminar';
    
    if (ratelimit) {
      const ip = request.headers.get("x-forwarded-for") ?? "127.0.0.1";
      const { success, limit, reset, remaining } = await ratelimit.limit(ip);
      if (!success) {
        return NextResponse.json(
          { error: 'Too many requests! Please wait 1 minute before generating again.' },
          { 
            status: 429,
            headers: {
              'X-RateLimit-Limit': limit.toString(),
              'X-RateLimit-Remaining': remaining.toString(),
              'X-RateLimit-Reset': reset.toString()
            }
          }
        );
      }
    }
    
    if (!file && !titleOnly) {
      return NextResponse.json({ error: 'Please provide either a PDF file or a Title' }, { status: 400 });
    }

    if (file && file.size > 10 * 1024 * 1024) {
      return NextResponse.json({ error: 'File size exceeds the 10MB limit. Please upload a smaller PDF.' }, { status: 400 });
    }

    let prompt = '';

    if (file && file.type === 'application/pdf') {
      const arrayBuffer = await file.arrayBuffer();
      
      const doc = await pdfjsLib.getDocument(new Uint8Array(arrayBuffer)).promise;
      let textContent = '';
      
      for (let i = 1; i <= doc.numPages; i++) {
        const page = await doc.getPage(i);
        const content = await page.getTextContent();
        const strings = content.items
          .filter((item) => 'str' in item)
          .map((item) => (item as { str: string }).str);
        textContent += strings.join(' ') + '\n';
      }

      if (subjectType === 'robotics') {
        prompt = `
        You are an expert academic assistant. I am providing you with the text extracted from a research paper or project doc. 
        Read the paper and extract the following information EXACTLY in this JSON format for a Robotics & Automation Synopsis.
        
        Format:
        {
          "title": "Full title of the project",
          "problemStatement": "Strictly 2-3 lines clearly describing the problem your project solves.",
          "projectDescription": "Strictly 4-5 lines providing a brief description of the application.",
          "hardwareComponents": ["Component 1", "Component 2", "Component 3"], // ONLY the component names! Absolutely NO theory or explanations. Just a list of parts (e.g. Raspberry Pi, Motor Driver).
          "expectedOutcome": "Strictly 1-2 lines detailing what will be achieved after completion of the project."
        }

        Paper Text:
        ${textContent.substring(0, 15000)}
        `;
      } else {
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
      }
    } else if (titleOnly) {
      if (subjectType === 'robotics') {
        prompt = `
        You are an expert academic assistant. A group of engineering students wants to generate a Robotics & Automation Synopsis based ONLY on the following title: "${titleOnly}".
        Generate highly realistic and highly technical content for a robotics project that perfectly matches this title.
        
        Return the output EXACTLY in this JSON format.
        {
          "title": "${titleOnly}",
          "problemStatement": "Strictly 2-3 lines clearly describing the problem your project solves.",
          "projectDescription": "Strictly 4-5 lines providing a brief description of the application.",
          "hardwareComponents": ["Component 1", "Component 2", "Component 3"], // ONLY the component names! Absolutely NO theory or explanations. Just a list of parts (e.g. Raspberry Pi, Motor Driver).
          "expectedOutcome": "Strictly 1-2 lines detailing what will be achieved after completion of the project."
        }
        `;
      } else {
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
      }
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
