"use client";

import { FaGithub, FaLinkedin, FaEnvelope, FaHeart } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="py-8 px-6 border-t border-border">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo & copyright */}
          <div className="flex items-center gap-4">
            <span className="text-xl font-bold">
              <span className="gradient-text">AV</span>
            </span>
            <span className="text-text-muted text-sm">
              {new Date().getFullYear()} Arjun Varma. All rights reserved.
            </span>
          </div>

          {/* Made with love */}
          <div className="flex items-center gap-2 text-text-muted text-sm">
            <span>Built with</span>
            <FaHeart className="text-accent animate-pulse" size={14} />
            <span>using Next.js & AI</span>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/ARJUNVARMA2000"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-muted hover:text-accent transition-colors"
            >
              <FaGithub size={18} />
            </a>
            <a
              href="https://www.linkedin.com/in/varma-arjun/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-muted hover:text-accent transition-colors"
            >
              <FaLinkedin size={18} />
            </a>
            <a
              href="mailto:av3342@columbia.edu"
              className="text-text-muted hover:text-accent transition-colors"
            >
              <FaEnvelope size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
