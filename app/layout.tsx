import type { Metadata } from "next";
import "./globals.css";
import ThemeProvider from "@/components/ThemeProvider";

export const metadata: Metadata = {
  metadataBase: new URL("https://arjun-varma.com"),
  title: "Arjun Varma | Data Science & ML Portfolio",
  description:
    "Arjun Varma - MS Data Science at Columbia University. Advanced Data Science Consultant specializing in Machine Learning, Deep Learning, and Analytics for Fortune 500 healthcare clients. Open to Summer 2026 internships.",
  keywords: [
    "Arjun Varma",
    "Data Scientist",
    "Machine Learning Engineer",
    "ML Intern",
    "Quant Intern",
    "Data Science Intern",
    "Columbia University",
    "ZS Associates",
    "Python",
    "PyTorch",
    "Data Science Portfolio",
    "Summer 2026",
  ],
  authors: [{ name: "Arjun Varma", url: "https://www.linkedin.com/in/varma-arjun/" }],
  creator: "Arjun Varma",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Arjun Varma | Data Science & ML Portfolio",
    description:
      "MS Data Science @ Columbia | Advanced Data Science Consultant | Open to Summer 2026 Internships in Data Science, ML, and Quant roles.",
    siteName: "Arjun Varma Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Arjun Varma - Data Scientist & ML Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Arjun Varma | Data Science & ML Portfolio",
    description:
      "MS Data Science @ Columbia | Open to Summer 2026 Internships in DS/ML/Quant",
    images: ["/og-image.png"],
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
        <meta name="theme-color" content="#0f0f0f" />
      </head>
      <body className="antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
