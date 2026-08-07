<div align="center">
  <img src="public/logo.png" alt="TSeminar AI Logo" width="120" />
  <h1 align="center">TSeminar AI - Synopsis Generator</h1>
  <p align="center">
    <strong>A Premium, Enterprise-Grade SaaS for Automated Technical Seminar Synopses</strong>
    <br />
    Accelerated by <strong>Groq Neural Engine</strong>
  </p>
  <p align="center">
    <a href="https://github.com/Abhi666-max/TSeminar-Synopsis-Generator"><img src="https://img.shields.io/badge/Open%20Source-Yes-brightgreen?style=for-the-badge" alt="Open Source"></a>
    <a href="https://nextjs.org/"><img src="https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js" alt="Next.js"></a>
    <a href="https://tailwindcss.com/"><img src="https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css" alt="Tailwind CSS"></a>
    <a href="https://groq.com/"><img src="https://img.shields.io/badge/Powered_by-Groq-f33535?style=for-the-badge" alt="Groq AI"></a>
  </p>
</div>

<hr />

## 🌟 Overview

**TSeminar AI** is a state-of-the-art, high-performance web application designed to eliminate the hours spent formatting technical seminar synopses. By leveraging cutting-edge LLMs running on Groq's lightning-fast LPU inference engines, this tool instantly generates **pixel-perfect, print-ready PDFs** from just a title or an uploaded research paper.

The entire interface has been meticulously crafted to deliver a **premium SaaS experience**, featuring glassmorphism, dynamic 3D visuals, micro-animations, and responsive layouts.

## 🚀 Key Features

- **Instant PDF Generation**: No more fighting with margins. Outputs perfectly formatted PDFs ready for academic submission.
- **Groq Neural Inference**: Synthesize context-aware, highly technical academic language in milliseconds.
- **Dual Input Modes**: 
  - **Upload a Paper**: The AI extracts core methodologies, objectives, and problem statements directly from a PDF.
  - **Title Only**: The AI hallucinates a highly realistic, technical synopsis complete with credible authors, journals, and DOIs.
- **World-Class UI/UX**: Built with Framer Motion, featuring smooth sweeping borders, ambient glows, and dark-glass aesthetics.
- **SaaS-Level Success Modals**: Premium feedback loops and scrolling locks for flawless interaction design.

## 📂 Architecture & File Structure

```text
📦 TSeminar-Synopsis-Generator
 ┣ 📂 public
 ┃ ┣ 📜 icon.png
 ┃ ┣ 📜 logo.png
 ┃ ┗ 📜 seminar_format.pdf            # Base template for the generated PDF
 ┣ 📂 src
 ┃ ┣ 📂 app
 ┃ ┃ ┣ 📂 api/extract
 ┃ ┃ ┃ ┗ 📜 route.ts                  # Groq API Integration & PDF parsing
 ┃ ┃ ┣ 📜 globals.css                 # Advanced CSS with custom utilities & animations
 ┃ ┃ ┣ 📜 layout.tsx                  # Root Next.js Layout
 ┃ ┃ ┗ 📜 page.tsx                    # Main Entry Page
 ┃ ┣ 📂 components
 ┃ ┃ ┣ 📜 Background.tsx              # Animated CSS Gradients and Noise
 ┃ ┃ ┣ 📜 CustomCursor.tsx            # SaaS-style custom trailing cursor
 ┃ ┃ ┣ 📜 FAQ.tsx                     # Accordion FAQ section
 ┃ ┃ ┣ 📜 Features.tsx                # Grid layout showcasing core capabilities
 ┃ ┃ ┣ 📜 Footer.tsx                  # Branding, Links, and Credits
 ┃ ┃ ┣ 📜 GeneratorCard.tsx           # The core engine UI & Success Modal
 ┃ ┃ ┣ 📜 Hero.tsx                    # Stunning 3D mesh landing hero
 ┃ ┃ ┣ 📜 Navbar.tsx                  # Glassmorphic responsive header
 ┃ ┃ ┣ 📜 Statistics.tsx              # Inference speed and metrics counter
 ┃ ┃ ┗ 📜 Workflow.tsx                # Visual step-by-step pipeline
 ┃ ┗ 📂 lib
 ┃   ┗ 📜 generatePdf.ts              # pdf-lib engine injecting AI data into PDF
 ┣ 📜 next.config.ts
 ┣ 📜 tailwind.config.ts
 ┗ 📜 README.md
```

## 🛠️ Technologies Used

| Technology | Purpose |
| :--- | :--- |
| **Next.js (App Router)** | Full-stack React framework |
| **TypeScript** | Type-safe, reliable engineering |
| **Tailwind CSS** | Precision styling and complex gradients |
| **Framer Motion** | Micro-interactions and continuous border animations |
| **Groq SDK** | Millisecond AI inference |
| **pdf-lib** | Client/Server side PDF manipulation and rendering |
| **pdf-parse** | Extracting data from uploaded academic papers |

## ⚙️ Local Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Abhi666-max/TSeminar-Synopsis-Generator.git
   cd TSeminar-Synopsis-Generator
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up Environment Variables:**
   Create a `.env.local` file in the root directory:
   ```env
   GROQ_API_KEY=your_groq_api_key_here
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## 🤝 Credits & Connect

- **Engineered & Designed By:** Abhijeet Kangane
- **GitHub:** [@Abhi666-max](https://github.com/Abhi666-max)
- **LinkedIn:** [Abhijeet Kangane](https://www.linkedin.com/in/abhijeet-kangane/)

---
<p align="center">
  <i>"Stop formatting. Start building your future."</i>
</p>
