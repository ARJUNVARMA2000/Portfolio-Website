"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes, FaDownload, FaGithub } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";
import ThemeToggle from "@/components/ThemeToggle";
import { useToast } from "./ToastContext";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const { addToast } = useToast();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Update active section based on scroll position
      const sections = navLinks.map(link => link.href.slice(1));
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleResumeDownload = () => {
    addToast("Resume download started!", "info");
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-bg/60 backdrop-blur-2xl border-b border-border/30 shadow-lg shadow-bg/20"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo / Brand */}
          <motion.a
            href="#"
            className="flex items-center gap-2 group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-purple to-accent-pink flex items-center justify-center shadow-glow-sm group-hover:shadow-glow transition-shadow duration-300">
              <span className="text-white font-bold text-lg">A</span>
            </div>
            <span className="hidden sm:block font-heading font-semibold text-text">
              Arjun<span className="text-accent-cyan">.</span>
            </span>
          </motion.a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1 bg-surface/40 backdrop-blur-xl rounded-full px-2 py-2 border border-border/30">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                  activeSection === link.href.slice(1)
                    ? "text-white"
                    : "text-text-secondary hover:text-text"
                }`}
              >
                {activeSection === link.href.slice(1) && (
                  <motion.span
                    layoutId="activeNav"
                    className="absolute inset-0 bg-gradient-to-r from-accent-purple to-accent-cyan rounded-full -z-10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                {link.label}
              </a>
            ))}
          </div>

          {/* Right side */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="/field-notes"
              className="px-3 py-1.5 rounded-full text-xs font-medium text-text-secondary hover:text-accent-pink border border-border/50 hover:border-accent-pink/40 transition-all duration-300"
              title="View portfolio as a field notebook"
            >
              Field Notes ↗
            </a>
            <a
              href="https://github.com/ARJUNVARMA2000"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl text-text-secondary hover:text-accent-cyan hover:bg-accent-cyan/10 transition-all duration-300"
            >
              <FaGithub size={18} />
            </a>
            <ThemeToggle />
            <a
              href="/resume.pdf"
              download
              onClick={handleResumeDownload}
              className="btn-primary text-sm py-2.5 px-5"
            >
              <FaDownload size={12} />
              <span>Resume</span>
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center gap-3 md:hidden">
            <ThemeToggle />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2.5 rounded-xl bg-surface/50 border border-border/50 text-text-secondary hover:text-text transition-all"
            >
              {isMobileMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -20 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="md:hidden bg-bg/95 backdrop-blur-2xl border-b border-border/30"
          >
            <div className="px-6 py-6 space-y-2">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-4 py-3 rounded-xl transition-all duration-300 ${
                    activeSection === link.href.slice(1)
                      ? "bg-gradient-to-r from-accent-purple/20 to-accent-cyan/20 text-accent-cyan border border-accent-purple/30"
                      : "text-text-secondary hover:text-text hover:bg-surface/50"
                  }`}
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.25 }}
                className="pt-4 flex gap-3"
              >
                <a
                  href="https://github.com/ARJUNVARMA2000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-surface/50 border border-border/50 text-text-secondary hover:text-accent-cyan transition-all"
                >
                  <FaGithub size={18} />
                  GitHub
                </a>
                <a
                  href="/resume.pdf"
                  download
                  onClick={handleResumeDownload}
                  className="flex-1 btn-primary justify-center"
                >
                  <FaDownload size={12} />
                  Resume
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
