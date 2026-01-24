"use client";

import { useCallback } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope, FaArrowDown, FaPlay } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";
import Image from "next/image";

export default function Hero() {
  const scrollToAbout = useCallback(() => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="orb orb-purple w-96 h-96 -top-48 -left-48 animate-orb-pulse" />
        <div className="orb orb-cyan w-80 h-80 top-1/4 -right-40 animate-orb-pulse" style={{ animationDelay: "2s" }} />
        <div className="orb orb-pink w-64 h-64 bottom-20 left-1/4 animate-orb-pulse" style={{ animationDelay: "4s" }} />
      </div>

      {/* Mesh gradient background */}
      <div className="mesh-gradient" />
      <div className="noise-overlay" />

      {/* Main content - Bento Grid Layout */}
      <div className="relative z-10 px-6 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">

          {/* Main Hero Card - spans 8 columns */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            className="lg:col-span-8 card-glow p-8 md:p-12"
          >
            {/* Status badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 mb-6"
            >
              <span className="badge badge-glow">
                <HiSparkles className="text-accent-cyan" />
                Available for Summer 2026
              </span>
            </motion.div>

            {/* Name with gradient */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6 tracking-tight"
            >
              <span className="gradient-text-animated">Arjun Varma</span>
            </motion.h1>

            {/* Role with typewriter-style */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mb-6"
            >
              <p className="text-2xl md:text-3xl lg:text-4xl text-text-secondary font-light">
                Data Scientist &{" "}
                <span className="text-accent-cyan">ML Engineer</span>
              </p>
            </motion.div>

            {/* Education badge */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-text-muted text-lg mb-8 flex items-center gap-2"
            >
              <span className="w-2 h-2 rounded-full bg-accent-purple animate-pulse" />
              MS Data Science @ Columbia University
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <a href="#projects" className="btn-primary group">
                <FaPlay size={12} className="group-hover:translate-x-0.5 transition-transform" />
                <span>View My Work</span>
              </a>
              <a href="#contact" className="btn-secondary">
                Get in Touch
              </a>
            </motion.div>
          </motion.div>

          {/* Right side - Profile Card & Quick Links */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            {/* Profile Image Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="card-animated-border p-1"
            >
              <div className="relative aspect-square rounded-[18px] overflow-hidden">
                <Image
                  src="/images/profile.jpg"
                  alt="Arjun Varma"
                  fill
                  className="object-cover object-top"
                  priority
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-bg/80 via-transparent to-transparent" />
              </div>
            </motion.div>

            {/* Quick Stats Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="card p-6"
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <p className="text-3xl font-bold gradient-text">3+</p>
                  <p className="text-text-muted text-sm">Years Experience</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold gradient-text">10+</p>
                  <p className="text-text-muted text-sm">ML Projects</p>
                </div>
              </div>
            </motion.div>

            {/* Social Links Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="card p-4"
            >
              <div className="flex justify-center gap-3">
                <a
                  href="https://github.com/ARJUNVARMA2000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-surface/50 border border-border/50 text-text-muted hover:text-accent-cyan hover:border-accent-cyan/50 hover:shadow-glow-cyan transition-all duration-300"
                >
                  <FaGithub size={22} />
                </a>
                <a
                  href="https://www.linkedin.com/in/varma-arjun/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-surface/50 border border-border/50 text-text-muted hover:text-accent-purple hover:border-accent-purple/50 hover:shadow-glow transition-all duration-300"
                >
                  <FaLinkedin size={22} />
                </a>
                <a
                  href="mailto:av3342@columbia.edu"
                  className="p-3 rounded-xl bg-surface/50 border border-border/50 text-text-muted hover:text-accent-pink hover:border-accent-pink/50 hover:shadow-glow-pink transition-all duration-300"
                >
                  <FaEnvelope size={22} />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        onClick={scrollToAbout}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-text-muted hover:text-accent-cyan transition-colors group"
      >
        <span className="text-xs tracking-[0.3em] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <FaArrowDown size={14} className="group-hover:text-accent-cyan" />
        </motion.div>
      </motion.button>
    </section>
  );
}
