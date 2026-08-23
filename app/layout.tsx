import type { Metadata } from "next";
import { Fraunces, Familjen_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { ChatMount } from "@/components/chat/chat-mount";
import { SmoothScroll } from "@/components/motion/smooth-scroll";
import { SITE } from "@/content/site";

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
  metadataBase: new URL(SITE.url),
  title: {
    default: SITE.title,
    template: "%s — Arjun Varma",
  },
  description: SITE.description,
  alternates: { canonical: "/" },
  keywords: [
    "Arjun Varma",
    "Data Scientist",
    "Machine Learning Engineer",
    "Columbia University",
    "Novo Nordisk",
    "Experimentation",
    "Propensity Scoring",
    "Agentic AI",
    "RAG",
    "LLM",
    "Evals",
    "Python",
    "PySpark",
  ],
  authors: [{ name: SITE.name, url: SITE.linkedin }],
  creator: SITE.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    title: SITE.title,
    description: SITE.description,
    siteName: SITE.name,
    url: SITE.url,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.title,
    description: SITE.description,
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
