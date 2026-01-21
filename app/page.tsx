"use client";

import { motion } from "framer-motion";
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
  return (
    <main className="min-h-screen bg-bg text-text">
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
      <FunZone />
    </main>
  );
}
