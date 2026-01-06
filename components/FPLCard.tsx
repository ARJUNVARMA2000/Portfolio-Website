"use client";

import { motion } from "framer-motion";
import { FaFutbol, FaTrophy, FaExternalLinkAlt } from "react-icons/fa";

export default function FPLCard() {
  return (
    <section id="fpl" className="py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="card p-8 relative overflow-hidden"
        >
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 via-transparent to-accent-tertiary/5" />

          <div className="relative z-10">
            <div className="flex flex-col md:flex-row items-center gap-6">
              {/* Icon */}
              <div className="flex-shrink-0">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-lg">
                  <FaFutbol size={32} className="text-white" />
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                  <FaTrophy className="text-accent" size={16} />
                  <h3 className="text-xl font-semibold">
                    Fantasy Premier League
                  </h3>
                </div>
                <p className="text-text-secondary mb-4">
                  Avid FPL player with{" "}
                  <span className="text-accent font-semibold">Top 1% finishes</span>{" "}
                  for{" "}
                  <span className="text-accent-secondary font-semibold">4 consecutive years</span>.
                  Combining data analysis passion with sports strategy!
                </p>
                <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                  <span className="badge">Top 1%</span>
                  <span className="badge-secondary">4 Years</span>
                </div>
              </div>

              {/* CTA */}
              <div className="flex-shrink-0">
                <a
                  href="https://fantasy.premierleague.com/entry/50075/history"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-green-600 hover:bg-green-500 text-white rounded-xl transition-all duration-200 hover:shadow-lg"
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
