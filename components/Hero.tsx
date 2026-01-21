"use client";

import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope, FaArrowDown } from "react-icons/fa";
import Image from "next/image";

const roles = [
  "Data Scientist",
  "ML Engineer",
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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background gradient orb - simplified to single orb */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl animate-pulse-soft" />
      </div>

      {/* Content - Two Column Grid */}
      <div className="relative z-10 px-6 max-w-6xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Column */}
          <div className="order-2 lg:order-1 text-center lg:text-left">
            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4 tracking-tight"
            >
              <span className="gradient-text">Arjun Varma</span>
            </motion.h1>

            {/* Typing role */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="h-10 md:h-12 flex items-center justify-center lg:justify-start mb-6"
            >
              <span className="text-xl md:text-2xl text-text-secondary font-light">
                {displayText}
                <span className="typing-cursor">&nbsp;</span>
              </span>
            </motion.div>

            {/* Education Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mb-4"
            >
              <span className="inline-block px-4 py-2 rounded-full bg-surface border border-border text-sm text-text-secondary">
                MS Data Science @ Columbia University
              </span>
            </motion.div>

            {/* Availability Badge */}
            <motion.a
              href="#contact"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.55 }}
              className="inline-flex items-center gap-3 px-5 py-2.5 mb-8 rounded-full bg-accent-secondary/10 border border-accent-secondary/30 hover:border-accent-secondary/60 transition-all duration-300 group"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent-secondary"></span>
              </span>
              <span className="text-sm text-text-secondary group-hover:text-text transition-colors">
                <span className="text-accent-secondary font-medium">Open to Summer 2026 internships</span>
              </span>
            </motion.a>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center mb-8"
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
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex gap-4 justify-center lg:justify-start"
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

          {/* Image Column */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.8,
                delay: 0.2,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <motion.div
                animate={{
                  y: [0, -8, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative"
              >
                {/* Animated gradient ring */}
                <div className="absolute -inset-1 bg-gradient-to-r from-accent via-accent-secondary to-accent-tertiary rounded-full opacity-75 blur-sm animate-spin-slow" />
                <div className="absolute -inset-1 bg-gradient-to-r from-accent via-accent-secondary to-accent-tertiary rounded-full opacity-50" />

                {/* Glow effect */}
                <div className="absolute -inset-4 bg-accent/20 rounded-full blur-2xl animate-pulse-soft" />

                {/* Image container - 256px as specified */}
                <div className="relative w-56 h-56 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-bg">
                  <Image
                    src="/images/profile.jpg"
                    alt="Arjun Varma"
                    fill
                    className="object-cover object-top"
                    priority
                  />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1 }}
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
