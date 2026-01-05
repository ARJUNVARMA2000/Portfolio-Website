"use client";

import { FaGithub, FaLinkedin, FaEnvelope, FaHeart } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="py-8 px-4 border-t border-gray-800">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo & copyright */}
          <div className="flex items-center gap-4">
            <span className="font-cyber text-xl font-bold text-cyber-cyan">
              AV<span className="text-cyber-magenta">.</span>
            </span>
            <span className="text-gray-500 text-sm">
              © {new Date().getFullYear()} Arjun Varma. All rights reserved.
            </span>
          </div>

          {/* Made with love */}
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <span>Built with</span>
            <FaHeart className="text-cyber-magenta animate-pulse" />
            <span>using Next.js & AI</span>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/ARJUNVARMA2000"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-cyber-cyan transition-colors"
            >
              <FaGithub size={20} />
            </a>
            <a
              href="https://linkedin.com/in/vvarma-arjun"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-cyber-cyan transition-colors"
            >
              <FaLinkedin size={20} />
            </a>
            <a
              href="mailto:av3342@columbia.edu"
              className="text-gray-500 hover:text-cyber-cyan transition-colors"
            >
              <FaEnvelope size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
