import type { Metadata } from "next";
import { Fraunces, Familjen_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { ChatMount } from "@/components/chat/chat-mount";
import { SmoothScroll } from "@/components/motion/smooth-scroll";

const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  variable: "--font-serif",
  display: "swap",
});

const grotesk = Familjen_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://arjun-varma.com"),
  title: {
    default: "Arjun Varma — Data Scientist & ML Engineer",
    template: "%s — Arjun Varma",
  },
  description:
    "Data Science Intern at Novo Nordisk (Commercial Data Science — Rare Disease & Wegovy/Ozempic). M.S. Data Science at Columbia. 3+ years of production ML in healthcare. Available for full-time DS/MLE roles from January 2027.",
  keywords: [
    "Arjun Varma",
    "Data Scientist",
    "Machine Learning Engineer",
    "Columbia University",
    "Novo Nordisk",
    "Agentic AI",
    "RAG",
    "LLM",
    "Evals",
    "Python",
    "PySpark",
  ],
  authors: [{ name: "Arjun Varma", url: "https://www.linkedin.com/in/varma-arjun/" }],
  creator: "Arjun Varma",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Arjun Varma — Data Scientist & ML Engineer",
    description:
      "Production ML and agentic systems — pipelines, evals, citations. Novo Nordisk · Columbia MS · 3+ yrs production ML. Available full-time Jan 2027.",
    siteName: "Arjun Varma",
  },
  twitter: {
    card: "summary_large_image",
    title: "Arjun Varma — Data Scientist & ML Engineer",
    description:
      "Production ML and agentic systems — pipelines, evals, citations. Novo Nordisk · Columbia MS · available full-time Jan 2027.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${grotesk.variable} ${mono.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <meta name="theme-color" content="#fafaf7" />
      </head>
      <body className="bg-bg font-sans text-ink antialiased">
        <SmoothScroll>
          <Nav />
          {children}
          <Footer />
        </SmoothScroll>
        <ChatMount />
        <div aria-hidden className="grain" />
        <Analytics />
      </body>
    </html>
  );
}
