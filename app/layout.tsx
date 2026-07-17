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
    "Data Scientist and ML Engineer building forecasting, decision-support, and agentic systems. Data Science Intern at Novo Nordisk and M.S. Data Science candidate at Columbia.",
  alternates: { canonical: "/" },
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
      "Forecasting, decision-support, and agentic systems — from reliable data and evaluation through deployed products.",
    siteName: "Arjun Varma",
    url: "https://arjun-varma.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "Arjun Varma — Data Scientist & ML Engineer",
    description:
      "Forecasting, decision-support, and agentic systems — from reliable data and evaluation through deployed products.",
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
