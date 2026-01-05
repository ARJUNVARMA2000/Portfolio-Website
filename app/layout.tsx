import type { Metadata } from "next";
import "./globals.css";
import ThemeProvider from "@/components/ThemeProvider";

export const metadata: Metadata = {
  title: "Arjun Varma | ML & Data Science Portfolio",
  description: "Portfolio of Arjun Varma - Advanced Data Science Associate Consultant specializing in Machine Learning, Deep Learning, and Analytics",
  keywords: ["Arjun Varma", "Data Science", "Machine Learning", "Columbia University", "Portfolio", "AI"],
  authors: [{ name: "Arjun Varma" }],
  openGraph: {
    title: "Arjun Varma | ML & Data Science Portfolio",
    description: "Advanced Data Science Associate Consultant specializing in Machine Learning, Deep Learning, and Analytics",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="noise-bg">
        <ThemeProvider>
          <div className="scanline-overlay" />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
