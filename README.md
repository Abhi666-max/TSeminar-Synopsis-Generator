<div align="center">
  <img src="./public/logo.png" alt="KSE Synopsis Generator" width="120" />
  <h1>KSE Synopsis Generator</h1>
  <p>
    <strong>Automated University Synopsis & Report Generator</strong>
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

KSE Synopsis Generator is a scalable web app built to save engineering students hours of formatting work. Instead of struggling with Word documents and strict margins, this tool takes your project title or an uploaded document, extracts the necessary data using Groq's fast LLM API, and outputs a perfectly formatted PDF that matches the exact submission guidelines of the university.

Built with an extensible architecture, it supports various university formats (both individual and group submissions) and can be easily customized to generate synopses for new subjects and domains.

## Features

- **Dynamic Data Extraction:** Upload a research paper or document (PDF), and the app will automatically read, understand, and extract key information like the Problem Statement, Objectives, and Methodology.
- **Generate from Title:** Don't have a base paper yet? Just type your project title. The AI will invent realistic, academically appropriate placeholder content that perfectly fits your university's format.
- **Official & Perfect Formatting:** Uses `pdf-lib` to map the AI-generated data directly onto the official university PDF templates. The spacing, fonts, and alignment are exactly what the faculty expects.
- **Extensible Architecture:** Designed to easily add new university subject formats (both individual 2-page formats and group 3-member formats).
- **Security & Performance Limits:** Includes a 10MB file size limit for PDF uploads to keep the server stable, and uses edge-optimized routes for blazing fast generation.
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

