"use client";

import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope, FaArrowDown } from "react-icons/fa";

const roles = [
  "Data Scientist",
  "ML Engineer",
  "Analytics Consultant",
  "AI Developer",
];

export default function Hero() {
  const [currentRole, setCurrentRole] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // Typing effect
  useEffect(() => {
    const currentText = roles[currentRole];
    const typeSpeed = isDeleting ? 50 : 100;
    const pauseTime = 2000;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentText.length) {
          setDisplayText(currentText.slice(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), pauseTime);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(currentText.slice(0, displayText.length - 1));
        } else {
          setIsDeleting(false);
          setCurrentRole((prev) => (prev + 1) % roles.length);
        }
      }
    }, typeSpeed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentRole]);

  const scrollToAbout = useCallback(() => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse-soft" />
        <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-accent-secondary/10 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: "1.5s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-tertiary/5 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-surface border border-border text-sm text-text-secondary">
            MS Data Science @ Columbia University
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight"
        >
          <span className="gradient-text">Arjun Varma</span>
        </motion.h1>

        {/* Typing role */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="h-10 md:h-12 flex items-center justify-center mb-6"
        >
          <span className="text-xl md:text-2xl text-text-secondary font-light">
            {displayText}
            <span className="typing-cursor">&nbsp;</span>
          </span>
        </motion.div>

        {/* Availability Badge */}
        <motion.a
          href="#contact"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="inline-flex items-center gap-3 px-5 py-2.5 mb-8 rounded-full bg-accent-secondary/10 border border-accent-secondary/30 hover:border-accent-secondary/60 transition-all duration-300 group"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-secondary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent-secondary"></span>
          </span>
          <span className="text-sm text-text-secondary group-hover:text-text transition-colors">
            <span className="text-accent-secondary font-medium">Open to Summer 2026</span>
            {" "}— Data Science / ML / Quant Intern
          </span>
        </motion.a>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-text-muted text-lg max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Advanced Data Science Consultant @ ZS Associates | Building intelligent
          systems with ML, Deep Learning & AI for Fortune 500 healthcare clients.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
        >
          <a href="#projects" className="btn-primary">
            View My Work
          </a>
          <a href="#contact" className="btn-secondary">
            Get in Touch
          </a>
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex gap-4 justify-center"
        >
          <a
            href="https://github.com/ARJUNVARMA2000"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-xl bg-surface border border-border text-text-secondary hover:text-accent hover:border-accent/50 transition-all duration-200"
          >
            <FaGithub size={20} />
          </a>
          <a
            href="https://www.linkedin.com/in/varma-arjun/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-xl bg-surface border border-border text-text-secondary hover:text-accent hover:border-accent/50 transition-all duration-200"
          >
            <FaLinkedin size={20} />
          </a>
          <a
            href="mailto:av3342@columbia.edu"
            className="p-3 rounded-xl bg-surface border border-border text-text-secondary hover:text-accent hover:border-accent/50 transition-all duration-200"
          >
            <FaEnvelope size={20} />
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        onClick={scrollToAbout}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 p-3 rounded-full border border-border text-text-muted hover:text-accent hover:border-accent/50 transition-all duration-200"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <FaArrowDown size={16} />
        </motion.div>
      </motion.button>
    </section>
  );
}
