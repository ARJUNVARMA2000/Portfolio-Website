"use client";

import { motion } from "framer-motion";
import { FaFutbol, FaTrophy, FaExternalLinkAlt } from "react-icons/fa";

export default function FPLCard() {
  return (
    <section id="fpl" className="py-16 px-4 relative">
      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="cyber-card p-6 md:p-8 rounded-lg overflow-hidden relative"
        >
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-green-900/20 via-transparent to-purple-900/20" />
          
          <div className="relative z-10">
            <div className="flex flex-col md:flex-row items-center gap-6">
              {/* Icon */}
              <div className="flex-shrink-0">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center shadow-lg shadow-green-500/30">
                  <FaFutbol size={40} className="text-white" />
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                  <FaTrophy className="text-cyber-yellow" />
                  <h3 className="font-cyber text-xl md:text-2xl text-white">
                    Fantasy Premier League
                  </h3>
                </div>
                <p className="text-gray-300 mb-4">
                  Avid FPL player with{" "}
                  <span className="text-cyber-cyan font-bold">
                    Top 1% finishes
                  </span>{" "}
                  for{" "}
                  <span className="text-cyber-magenta font-bold">
                    4 consecutive years
                  </span>
                  . Combining data analysis passion with sports strategy!
                </p>
                <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                  <div className="flex items-center gap-2 px-3 py-1 bg-green-900/30 rounded-full border border-green-500/30">
                    <span className="text-green-400 text-sm">🏆 Top 1%</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1 bg-purple-900/30 rounded-full border border-purple-500/30">
                    <span className="text-purple-400 text-sm">📊 4 Years</span>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="flex-shrink-0">
                <a
                  href="https://fantasy.premierleague.com/entry/50073"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-500 hover:to-green-600 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/30"
                >
                  View Profile
                  <FaExternalLinkAlt size={12} />
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
