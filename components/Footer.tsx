"use client";

import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope, FaHeart } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="relative py-12 px-6 border-t border-border/30 bg-bg-secondary/30">
      {/* Subtle gradient line at top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-purple/50 to-transparent" />

      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo & copyright */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-purple to-accent-pink flex items-center justify-center">
              <span className="text-white font-bold text-lg">A</span>
            </div>
            <div>
              <p className="text-text font-medium">Arjun Varma</p>
              <p className="text-text-muted text-sm">
                Built with <FaHeart className="inline text-accent-pink mx-1" size={10} /> in NYC
              </p>
            </div>
          </motion.div>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex items-center gap-3"
          >
            <motion.a
              whileHover={{ scale: 1.1, y: -2 }}
              href="https://github.com/ARJUNVARMA2000"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl bg-surface/50 border border-border/30 text-text-muted hover:text-accent-cyan hover:border-accent-cyan/50 transition-all duration-300"
            >
              <FaGithub size={18} />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.1, y: -2 }}
              href="https://www.linkedin.com/in/varma-arjun/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl bg-surface/50 border border-border/30 text-text-muted hover:text-accent-purple hover:border-accent-purple/50 transition-all duration-300"
            >
              <FaLinkedin size={18} />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.1, y: -2 }}
              href="mailto:av3342@columbia.edu"
              className="p-3 rounded-xl bg-surface/50 border border-border/30 text-text-muted hover:text-accent-pink hover:border-accent-pink/50 transition-all duration-300"
            >
              <FaEnvelope size={18} />
            </motion.a>
          </motion.div>

          {/* Copyright */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-text-muted text-sm"
          >
            {new Date().getFullYear()} All rights reserved.
          </motion.p>
        </div>
      </div>
    </footer>
  );
}
