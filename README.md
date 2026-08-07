<div align="center">
  <img src="./public/logo.png" alt="KSE Synopsis Generator" width="120" />
  <h1>KSE Synopsis Generator</h1>
  <p>
    <strong>Automated Technical Seminar & Robotics Synopsis Generator</strong>
  </p>
  <p>
    <a href="https://github.com/Abhi666-max/kse-synopsis-generator"><img src="https://img.shields.io/badge/Open%20Source-Yes-brightgreen?style=for-the-badge" alt="Open Source"></a>
    <a href="https://nextjs.org/"><img src="https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js" alt="Next.js"></a>
    <a href="https://tailwindcss.com/"><img src="https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css" alt="Tailwind CSS"></a>
    <a href="https://groq.com/"><img src="https://img.shields.io/badge/Powered_by-Groq-f33535?style=for-the-badge" alt="Groq AI"></a>
  </p>
</div>

<hr />

## Overview

KSE Synopsis Generator is a web app built to save engineering students hours of formatting work. Instead of struggling with Word documents and margins, this tool takes your project title or an uploaded research paper, extracts the necessary data using Groq's fast LLM API, and outputs a perfectly formatted PDF that matches the exact submission guidelines of the university.

I built this to handle two main formats:
1. **Technical Seminars** (Individual 2-page format)
2. **Robotics & Automation** (Group 3-member format)

## Features

- **Upload & Extract:** Upload a research paper (PDF), and the app will automatically read it, understand it, and extract the Problem Statement, Objectives, Methodology, etc.
- **Generate from Title:** Don't have a paper yet? Just type your project title. The app will generate realistic placeholder content that fits the academic format perfectly.
- **Official Formatting:** Uses `pdf-lib` to map the extracted data directly onto the official university PDF templates. The spacing, fonts, and alignment are exactly what the faculty expects.
- **Security & Limits:** Includes a 10MB file size limit for PDF uploads to keep the server stable.
- **Clean UI:** Simple, dark-mode focused UI built with Tailwind CSS and Framer Motion for smooth transitions.

## Tech Stack

- **Frontend:** Next.js (App Router), React, Tailwind CSS, Framer Motion
- **Backend:** Next.js Route Handlers
- **AI Integration:** Groq SDK (Llama 3.1 model)
- **PDF Processing:** `pdf-lib` (for generating/editing PDFs), `pdfjs-dist` (for reading uploaded PDFs)

## Running Locally

1. **Clone the repo:**
   ```bash
   git clone https://github.com/Abhi666-max/kse-synopsis-generator.git
   cd kse-synopsis-generator
   ```

2. **Install packages:**
   ```bash
   npm install
   ```

3. **Set up your environment:**
   Create a `.env.local` file in the root folder and add your Groq API key:
   ```env
   GROQ_API_KEY=your_groq_api_key_here
   ```

4. **Start the dev server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view the app.

## Crafted by

**Abhijeet Kangane**

[![GitHub](https://img.shields.io/badge/GitHub-Abhi666--max-181717?style=flat-square&logo=github)](https://github.com/Abhi666-max)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Abhijeet%20Kangane-0A66C2?style=flat-square&logo=linkedin)](https://www.linkedin.com/in/abhijeet-kangane/)
[![X](https://img.shields.io/badge/X-abhijeet__037-000000?style=flat-square&logo=x)](http://x.com/abhijeet_037)
[![Instagram](https://img.shields.io/badge/Instagram-abhijeet.037-E4405F?style=flat-square&logo=instagram)](https://instagram.com/abhijeet.037)

