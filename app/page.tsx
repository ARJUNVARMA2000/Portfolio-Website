"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import FunZone from "@/components/FunZone";
import BackToTop from "@/components/BackToTop";
import ScrollProgress from "@/components/ScrollProgress";
import CommandPalette from "@/components/CommandPalette";
import { useToast } from "@/components/ToastContext";

// Page transition wrapper for smooth section animations
const PageSection = ({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) => (
  <motion.div
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.6, delay }}
  >
    {children}
  </motion.div>
);

export default function Home() {
  const { theme, setTheme } = useTheme();
  const { addToast } = useToast();
  const [funZoneOpen, setFunZoneOpen] = useState(false);

  const handleToggleTheme = useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark");
  }, [theme, setTheme]);

  const handleOpenGames = useCallback(() => {
    setFunZoneOpen(true);
  }, []);

  const handleCopyEmail = useCallback(() => {
    navigator.clipboard.writeText("av3342@columbia.edu");
    addToast("Email copied to clipboard!", "success");
  }, [addToast]);

  return (
    <main className="min-h-screen bg-bg text-text">
      <ScrollProgress />
      <Navbar />

      <PageSection>
        <Hero />
      </PageSection>

      <PageSection>
        <About />
      </PageSection>

      <PageSection>
        <Experience />
      </PageSection>

      <PageSection>
        <Projects />
      </PageSection>

      <PageSection>
        <Skills />
      </PageSection>

      <PageSection>
        <Contact />
      </PageSection>

      <Footer />
      <ChatWidget />
      <FunZone isOpen={funZoneOpen} onOpenChange={setFunZoneOpen} />
      <BackToTop />
      <CommandPalette
        onToggleTheme={handleToggleTheme}
        isDarkMode={theme === "dark"}
        onOpenGames={handleOpenGames}
        onCopyEmail={handleCopyEmail}
      />
    </main>
  );
}
