import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import Background from "@/components/Background";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "KSE Synopsis Generator",
  description: "Automate your university synopses, project reports, and official submissions with our AI in seconds.",
  openGraph: {
    title: "KSE Synopsis Generator",
    description: "Automate your university synopses, project reports, and official submissions with our AI in seconds.",
    url: "https://kse-synopsis-generator.vercel.app/",
    siteName: "KSE Synopsis Generator",
    type: "website",
  },
  icons: {
    icon: '/icon.png',
    apple: '/icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${outfit.variable} font-sans antialiased selection:bg-purple-500 selection:text-white bg-black`}
      >
        <CustomCursor />
        <Background />
        <Navbar />
        <main className="relative z-10 flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
