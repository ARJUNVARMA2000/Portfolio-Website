"use client";

import { useCallback } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import Image from "next/image";

export default function Hero() {
  const scrollToAbout = useCallback(() => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20">
      {/* Content - Centered, minimal layout */}
      <div className="relative z-10 px-6 max-w-4xl mx-auto w-full">
        <div className="flex flex-col items-center text-center">
          {/* Profile Image - Simple, no effects */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <div className="relative w-32 h-32 rounded-full overflow-hidden border border-border">
              <Image
                src="/images/profile.jpg"
                alt="Arjun Varma"
                fill
                className="object-cover object-top"
                priority
              />
            </div>
          </motion.div>

          {/* Name - Large, elegant */}
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-6xl lg:text-7xl font-normal mb-6 tracking-tight"
          >
            <span className="gradient-text">Arjun Varma</span>
          </motion.h1>

          {/* Role - Static, no typing effect */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-xl md:text-2xl text-text-secondary font-light mb-8"
          >
            Data Scientist & ML Engineer
          </motion.p>

          {/* Education */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-text-muted mb-4"
          >
            MS Data Science @ Columbia University
          </motion.p>

          {/* Availability - Subtle */}
          <motion.a
            href="#contact"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="inline-flex items-center gap-2 text-sm text-text-muted mb-12"
          >
            <span className="w-2 h-2 rounded-full bg-accent" />
            Open to Summer 2026 internships
          </motion.a>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 mb-12"
          >
            <a href="#projects" className="btn-primary">
              View Work
            </a>
            <a href="#contact" className="btn-secondary">
              Contact
            </a>
          </motion.div>

          {/* Social links - Minimal icons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex gap-6"
          >
            <a
              href="https://github.com/ARJUNVARMA2000"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-muted hover:text-accent"
            >
              <FaGithub size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/varma-arjun/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-muted hover:text-accent"
            >
              <FaLinkedin size={20} />
            </a>
            <a
              href="mailto:av3342@columbia.edu"
              className="text-text-muted hover:text-accent"
            >
              <FaEnvelope size={20} />
            </a>
          </motion.div>
        </div>
      </div>

      {/* Minimal scroll hint - just text */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
        onClick={scrollToAbout}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 text-text-muted text-xs tracking-widest uppercase"
      >
        Scroll
      </motion.button>
    </section>
  );
}
