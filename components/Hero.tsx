"use client";

import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope, FaChevronDown } from "react-icons/fa";

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
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; size: number; duration: number }>>([]);

  // Generate particles on mount
  useEffect(() => {
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 10 + 10,
    }));
    setParticles(newParticles);
  }, []);

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
      {/* Animated grid background */}
      <div className="absolute inset-0 grid-bg opacity-50" />
      
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-t-accent"
            style={{
              width: particle.size,
              height: particle.size,
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              opacity: 0.3,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-t-bg via-transparent to-t-bg" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        {/* Glitch name */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-4"
        >
          <span className="text-t-accent font-mono text-sm md:text-base tracking-[0.3em] uppercase">
            Welcome to the portfolio of
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative font-cyber text-5xl md:text-7xl lg:text-8xl font-black mb-6"
        >
          <span className="text-glow-cyan text-t-text">
            ARJUN VARMA
          </span>
        </motion.h1>

        {/* Typing role */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="h-12 md:h-16 flex items-center justify-center mb-8"
        >
          <span className="font-mono text-xl md:text-3xl text-t-accent2">
            {"< "}
          </span>
          <span className="font-mono text-xl md:text-3xl text-t-text min-w-[280px] md:min-w-[400px]">
            {displayText}
            <span className="typing-cursor">&nbsp;</span>
          </span>
          <span className="font-mono text-xl md:text-3xl text-t-accent2">
            {" />"}
          </span>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-t-muted text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          MS Data Science @ Columbia University | Advanced Data Science Consultant @ ZS Associates | 
          Building intelligent systems with ML, Deep Learning & AI
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
        >
          <a
            href="#projects"
            className="cyber-btn group"
          >
            View Projects
          </a>
          <a
            href="#contact"
            className="cyber-btn !border-[rgb(var(--t-accent2))] !text-[rgb(var(--t-accent2))] hover:!bg-[rgb(var(--t-accent2))] hover:!text-[rgb(var(--t-on-accent))] hover:shadow-md"
          >
            Get in Touch
          </a>
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex gap-6 justify-center"
        >
          <a
            href="https://github.com/ARJUNVARMA2000"
            target="_blank"
            rel="noopener noreferrer"
            className="text-t-muted hover:text-t-accent transition-all duration-300 hover:scale-110"
          >
            <FaGithub size={28} />
          </a>
          <a
            href="https://linkedin.com/in/vvarma-arjun"
            target="_blank"
            rel="noopener noreferrer"
            className="text-t-muted hover:text-t-accent transition-all duration-300 hover:scale-110"
          >
            <FaLinkedin size={28} />
          </a>
          <a
            href="mailto:av3342@columbia.edu"
            className="text-t-muted hover:text-t-accent transition-all duration-300 hover:scale-110"
          >
            <FaEnvelope size={28} />
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer"
        onClick={scrollToAbout}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-t-accent"
        >
          <FaChevronDown size={24} />
        </motion.div>
      </motion.div>

      {/* Corner decorations */}
      <div className="absolute top-4 left-4 w-20 h-20 border-l-2 border-t-2 border-t-border opacity-50" />
      <div className="absolute top-4 right-4 w-20 h-20 border-r-2 border-t-2 border-t-border opacity-50" />
      <div className="absolute bottom-4 left-4 w-20 h-20 border-l-2 border-b-2 border-t-border opacity-50" />
      <div className="absolute bottom-4 right-4 w-20 h-20 border-r-2 border-b-2 border-t-border opacity-50" />
    </section>
  );
}
