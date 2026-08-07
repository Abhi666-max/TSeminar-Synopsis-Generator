<div align="center">
  <img src="public/logo.png" alt="KSE Synopsis Generator Logo" width="120" />
  <h1 align="center">KSE Synopsis Generator</h1>
  <p align="center">
    <strong>An Enterprise-Grade AI SaaS for Automated Technical Seminars & Robotics Synopses</strong>
    <br />
    Accelerated by <strong>Groq Neural Engine</strong>
  </p>
  <p align="center">
    <a href="https://github.com/Abhi666-max/kse-synopsis-generator"><img src="https://img.shields.io/badge/Open%20Source-Yes-brightgreen?style=for-the-badge" alt="Open Source"></a>
    <a href="https://nextjs.org/"><img src="https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js" alt="Next.js"></a>
    <a href="https://tailwindcss.com/"><img src="https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css" alt="Tailwind CSS"></a>
    <a href="https://groq.com/"><img src="https://img.shields.io/badge/Powered_by-Groq-f33535?style=for-the-badge" alt="Groq AI"></a>
    <a href="https://framer.com/motion/"><img src="https://img.shields.io/badge/Framer_Motion-Motion-FF0055?style=for-the-badge&logo=framer" alt="Framer Motion"></a>
  </p>
</div>

<hr />

## 🌟 Overview

**KSE Synopsis Generator** is a state-of-the-art, high-performance web application designed to eliminate the hours spent formatting technical and academic project synopses. By leveraging cutting-edge LLMs running on Groq's lightning-fast LPU inference engines, this tool instantly generates **pixel-perfect, print-ready PDFs** strictly tailored to university formatting guidelines.

The interface has been meticulously crafted to deliver a **premium SaaS experience**, featuring deep dark modes, glassmorphism UI elements, dynamic 3D visuals, micro-animations, and hyper-optimized responsive layouts.

## 🚀 Key Features

- **Multi-Format Generators**:
  - 📄 **Technical Seminar**: Generates a highly technical 2-page individual synopsis based on research papers.
  - 🤖 **Robotics & Automation**: Generates a comprehensive 3-member group project synopsis with perfectly formatted student details and hardware lists.
- **Groq Neural Inference**: Synthesizes context-aware, highly technical academic language in milliseconds (`llama-3.1-8b-instant`).
- **Dual Input Modes**: 
  - **Upload a Paper**: The AI extracts core methodologies, objectives, and problem statements directly from a PDF securely (Max 10MB limit).
  - **Custom Title Engine**: Input any engineering title, and the AI will hallucinate a highly realistic, technical synopsis complete with credible authors, journals, and expected outcomes.
- **Flawless PDF Output**: Utilizes `pdf-lib` to strictly inject generated data into official hardcopy PDF templates, guaranteeing alignment, perfect line-spacing, and typography.
- **World-Class UI/UX**: Built with Framer Motion, featuring smooth sweeping borders, ambient neon glows, and sleek SaaS success modals.

## 📂 Architecture & File Structure

```text
📦 kse-synopsis-generator
 ┣ 📂 public
 ┃ ┣ 📜 logo.png
 ┃ ┣ 📜 seminar_format.pdf            # Base template for Technical Seminar
 ┃ ┗ 📜 robotics_format.pdf           # Base template for Robotics
 ┣ 📂 src
 ┃ ┣ 📂 app
 ┃ ┃ ┣ 📂 api/extract
 ┃ ┃ ┃ ┗ 📜 route.ts                  # Groq API Integration, PDF parsing & Security Limits
 ┃ ┃ ┣ 📂 robotics
 ┃ ┃ ┃ ┗ 📜 page.tsx                  # Robotics Generator UI
 ┃ ┃ ┣ 📂 seminar
 ┃ ┃ ┃ ┗ 📜 page.tsx                  # Seminar Generator UI
 ┃ ┃ ┣ 📜 globals.css                 # Advanced CSS with custom utilities
 ┃ ┃ ┣ 📜 layout.tsx                  # Root Next.js Layout
 ┃ ┃ ┗ 📜 page.tsx                    # Landing Page
 ┃ ┣ 📂 components
 ┃ ┃ ┣ 📜 Background.tsx              # Animated CSS Gradients and Noise
 ┃ ┃ ┣ 📜 GlobalGeneratorModal.tsx    # Centralized Subject Selector Modal
 ┃ ┃ ┣ 📜 GithubModal.tsx             # Post-generation Support Modal
 ┃ ┃ ┣ 📜 Footer.tsx                  # Premium Glassmorphism Footer
 ┃ ┃ ┣ 📜 Navbar.tsx                  # Glassmorphic Responsive Header
 ┃ ┃ ┗ ...
 ┃ ┗ 📂 lib
 ┃   ┣ 📜 generatePdf.ts              # PDF Engine for Technical Seminars
 ┃   ┗ 📜 generateRoboticsPdf.ts      # PDF Engine for Robotics & Automation
 ┣ 📜 next.config.ts                  # Next.js configurations & external canvas packages
 ┣ 📜 tailwind.config.ts
 ┗ 📜 README.md
```

## 🛠️ Technologies Used

| Technology | Purpose |
| :--- | :--- |
| **Next.js (App Router)** | Full-stack React framework optimized for Server Components |
| **TypeScript** | Type-safe, reliable, and scalable engineering |
| **Tailwind CSS** | Precision styling, flex layouts, and complex gradients |
| **Framer Motion** | Micro-interactions and continuous fluid animations |
| **Groq SDK** | Millisecond AI inference (Llama 3.1) |
| **pdf-lib** | Client/Server-side PDF manipulation and rendering |
| **pdfjs-dist** | Extracting textual data from uploaded academic papers |

## ⚙️ Local Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Abhi666-max/kse-synopsis-generator.git
   cd kse-synopsis-generator
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
   Open [http://localhost:3000](http://localhost:3000) to view the application.

## 🤝 Crafted by

Built with passion and a vision to automate tedious tasks for students everywhere.

<div align="left">
  <strong>Abhijeet Kangane</strong>
  <br />
  <a href="https://github.com/Abhi666-max">
    <img src="https://img.shields.io/badge/GitHub-Abhi666--max-181717?style=flat-square&logo=github" alt="GitHub" />
  </a>
  <a href="https://www.linkedin.com/in/abhijeet-kangane/">
    <img src="https://img.shields.io/badge/LinkedIn-Abhijeet%20Kangane-0A66C2?style=flat-square&logo=linkedin" alt="LinkedIn" />
  </a>
  <a href="http://x.com/abhijeet_037">
    <img src="https://img.shields.io/badge/X-abhijeet__037-000000?style=flat-square&logo=x" alt="X (Twitter)" />
  </a>
  <a href="https://instagram.com/abhijeet.037">
    <img src="https://img.shields.io/badge/Instagram-abhijeet.037-E4405F?style=flat-square&logo=instagram" alt="Instagram" />
  </a>
</div>

---
<p align="center">
  <i>"Stop formatting. Start building your future."</i>
</p>
