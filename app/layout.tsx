import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  metadataBase: new URL("https://arjun-varma.com"),
  title: "Arjun Varma — Field Notes",
  description:
    "Field Notes of Arjun Varma — data scientist, ML engineer, obsessive about the loop. Incoming Data Science Intern at Novo Nordisk (Summer \u201926). MS Data Science @ Columbia. Seeking full-time DS/MLE roles starting Jan \u201927.",
  keywords: [
    "Arjun Varma",
    "Data Scientist",
    "Machine Learning Engineer",
    "ML Intern",
    "Data Science Intern",
    "Columbia University",
    "Novo Nordisk",
    "Agentic AI",
    "RAG",
    "LLM",
    "Python",
    "PyTorch",
    "Field Notes",
  ],
  authors: [{ name: "Arjun Varma", url: "https://www.linkedin.com/in/varma-arjun/" }],
  creator: "Arjun Varma",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Arjun Varma — Field Notes",
    description:
      "data scientist, ML engineer, obsessive about the loop. Novo Nordisk Summer \u201926 incoming · Columbia MS · seeking full-time Jan \u201927.",
    siteName: "Arjun Varma — Field Notes",
  },
  twitter: {
    card: "summary_large_image",
    title: "Arjun Varma — Field Notes",
    description:
      "data scientist, ML engineer, obsessive about the loop. Columbia MS · Novo Nordisk \u201926 · open to full-time Jan \u201927.",
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
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <meta name="theme-color" content="#0A0C0D" />
      </head>
      <body className="antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
