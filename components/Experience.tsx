"use client";

import { motion } from "framer-motion";
import { FaBriefcase, FaAward, FaRocket } from "react-icons/fa";

const experiences = [
  {
    title: "Advanced Data Science Associate Consultant",
    company: "ZS Associates",
    location: "Pune, India",
    period: "Feb 2025 - Jun 2025",
    highlights: [
      "Worked in Performance Analytics, Forecasting, and Data Science teams for Fortune 500 healthcare clients; collaborated with US-based stakeholders",
      "Built and deployed an organization-wide analytics + ML platform consolidating multiple data sources to surface real-time KPIs by territory and product; partnered with PMs and marketing heads for a >$10B revenue oncology portfolio",
      "Drove adoption by 1,000+ sales reps and HQ leaders, replacing Excel reports and cutting prep time from days to minutes",
      "Piloted a retrieval-augmented LLM to turn FDA approval documents into concise briefs for commercial teams",
    ],
    color: "cyan",
  },
  {
    title: "Decision Analytics Associate Consultant",
    company: "ZS Associates",
    location: "Pune, India",
    period: "Jul 2024 - Jan 2025",
    highlights: [
      "Led a 5-member team on a strategic initiative to overhaul legacy business rules and modernize processes, saving ~50 hrs/mo and improving first-pass quality to >99%",
      "Built and productionized Positive-Unlabeled (PU) learning models at a Fortune 500 organization to systematically infer missing categorical labels in transactional data",
      "Implemented automated model drift checks and unit testing to ensure long-term reliability",
      "Scored top ~10% finish in company-wide hackathon; selected for lateral transfer into Data Science vertical",
      "Received Client Contraste Award for outstanding client outcomes and feedback",
    ],
    color: "magenta",
    award: true,
  },
  {
    title: "Decision Analytics Associate",
    company: "ZS Associates",
    location: "Pune, India",
    period: "Feb 2022 - Jun 2024",
    highlights: [
      "Engineered PySpark/SQL pipelines integrating multiple data sources to deliver brand performance insights across multiple products",
      "Defined patient-cohort inclusion/exclusion rules robust to missing/miscoded fields; yielded consistent, audit-ready analytics",
      "Drove reporting and ad-hoc analytics that surfaced care gaps and market opportunities, informing key brand strategies across multiple new launches",
      "Promoted to Associate Consultant in 4 cycles (typical: 5) via accelerated performance; received Expert Associate and Insight Illuminate Awards",
    ],
    color: "yellow",
    promoted: true,
  },
];

export default function Experience() {
  return (
    <section id="experience" className="py-20 px-4 relative bg-cyber-darker/50">
      <div className="absolute inset-0 grid-bg opacity-20" />
      
      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-cyber text-3xl md:text-4xl font-bold text-white mb-4">
            <span className="text-cyber-cyan">&lt;</span> Experience{" "}
            <span className="text-cyber-cyan">/&gt;</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyber-cyan to-cyber-magenta mx-auto" />
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-cyber-cyan via-cyber-magenta to-cyber-yellow" />

          {experiences.map((exp, index) => (
            <motion.div
              key={exp.period}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className={`relative mb-12 md:w-1/2 ${
                index % 2 === 0 ? "md:pr-12 md:ml-0" : "md:pl-12 md:ml-auto"
              }`}
            >
              {/* Timeline dot */}
              <div
                className={`absolute top-6 w-4 h-4 rounded-full border-2 ${
                  index % 2 === 0 ? "left-0 md:-right-2 md:left-auto" : "-left-2"
                } ${
                  exp.color === "cyan"
                    ? "border-cyber-cyan bg-cyber-cyan/30 shadow-neon-cyan"
                    : exp.color === "magenta"
                    ? "border-cyber-magenta bg-cyber-magenta/30 shadow-neon-magenta"
                    : "border-cyber-yellow bg-cyber-yellow/30 shadow-neon-yellow"
                }`}
              />

              {/* Card */}
              <div className="ml-6 md:ml-0 cyber-card p-6 rounded-lg group">
                {/* Badges */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {exp.award && (
                    <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium bg-cyber-magenta/20 text-cyber-magenta rounded border border-cyber-magenta/30">
                      <FaAward size={10} /> Award Winner
                    </span>
                  )}
                  {exp.promoted && (
                    <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium bg-cyber-yellow/20 text-cyber-yellow rounded border border-cyber-yellow/30">
                      <FaRocket size={10} /> Fast-Track Promotion
                    </span>
                  )}
                </div>

                <div className="flex items-start gap-3">
                  <FaBriefcase
                    className={`mt-1 flex-shrink-0 ${
                      exp.color === "cyan"
                        ? "text-cyber-cyan"
                        : exp.color === "magenta"
                        ? "text-cyber-magenta"
                        : "text-cyber-yellow"
                    }`}
                  />
                  <div>
                    <h3
                      className={`font-cyber text-lg font-bold ${
                        exp.color === "cyan"
                          ? "text-cyber-cyan"
                          : exp.color === "magenta"
                          ? "text-cyber-magenta"
                          : "text-cyber-yellow"
                      }`}
                    >
                      {exp.title}
                    </h3>
                    <p className="text-white font-medium">{exp.company}</p>
                    <p className="text-gray-400 text-sm">
                      {exp.location} | {exp.period}
                    </p>
                  </div>
                </div>

                <ul className="mt-4 space-y-2">
                  {exp.highlights.map((highlight, i) => (
                    <li
                      key={i}
                      className="text-gray-300 text-sm flex items-start gap-2"
                    >
                      <span
                        className={`mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                          exp.color === "cyan"
                            ? "bg-cyber-cyan"
                            : exp.color === "magenta"
                            ? "bg-cyber-magenta"
                            : "bg-cyber-yellow"
                        }`}
                      />
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
