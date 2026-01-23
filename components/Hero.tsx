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
      {/* Content - Two Column Grid */}
      <div className="relative z-10 px-6 max-w-6xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Column */}
          <div className="order-2 lg:order-1 text-center lg:text-left">
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
              className="inline-flex items-center gap-2 text-sm text-text-muted mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-accent" />
              Open to Summer 2026 internships
            </motion.a>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 mb-8 justify-center lg:justify-start"
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
              className="flex gap-6 justify-center lg:justify-start"
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

          {/* Image Column - Right side */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative w-56 h-56 md:w-64 md:h-64 rounded-full overflow-hidden border border-border">
                <Image
                  src="/images/profile.jpg"
                  alt="Arjun Varma"
                  fill
                  className="object-cover object-top"
                  priority
                />
              </div>
            </motion.div>
          </div>
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
