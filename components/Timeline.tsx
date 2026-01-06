"use client";

import { motion } from "framer-motion";
import { FaGraduationCap, FaBriefcase, FaAward, FaRocket, FaTrophy } from "react-icons/fa";

const timelineEvents = [
  {
    year: "2018",
    title: "Started B.Tech at VIT",
    subtitle: "Electronics & Communication Engineering",
    description: "Began undergraduate studies at Vellore Institute of Technology",
    icon: FaGraduationCap,
    color: "accent-tertiary",
  },
  {
    year: "2022",
    title: "Graduated with 4.0 GPA",
    subtitle: "Special Achiever Award & Merit Scholarship",
    description: "Completed B.Tech with perfect GPA (WES Evaluated), received academic honors",
    icon: FaTrophy,
    color: "accent",
  },
  {
    year: "2022",
    title: "Joined ZS Associates",
    subtitle: "Decision Analytics Associate",
    description: "Started career in analytics, building PySpark/SQL pipelines for Fortune 500 healthcare clients",
    icon: FaBriefcase,
    color: "accent-secondary",
  },
  {
    year: "2024",
    title: "Fast-Track Promotion",
    subtitle: "Associate Consultant (4 cycles vs typical 5)",
    description: "Promoted early due to accelerated performance; received Expert Associate and Insight Illuminate Awards",
    icon: FaRocket,
    color: "accent",
  },
  {
    year: "2024",
    title: "Hackathon Top 10%",
    subtitle: "Lateral Transfer to Data Science",
    description: "Selected for Data Science vertical after top finish in company-wide hackathon",
    icon: FaAward,
    color: "accent-tertiary",
  },
  {
    year: "2025",
    title: "Advanced Data Science Consultant",
    subtitle: "ML Platform & LLM Projects",
    description: "Led org-wide analytics platform, piloted RAG-based LLM for FDA documents, BTC cancer detection model",
    icon: FaBriefcase,
    color: "accent-secondary",
  },
  {
    year: "2025",
    title: "Started MS at Columbia",
    subtitle: "Data Science",
    description: "Pursuing Master's in Data Science; TA for Business Analytics II at Columbia Business School",
    icon: FaGraduationCap,
    color: "accent",
  },
];

export default function Timeline() {
  return (
    <section id="timeline" className="section section-alt px-6">
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Career <span className="gradient-text">Journey</span>
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            From engineering student to data scientist at Fortune 500 companies
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent via-accent-secondary to-accent-tertiary" />

          {timelineEvents.map((event, index) => {
            const Icon = event.icon;
            const isLeft = index % 2 === 0;

            return (
              <motion.div
                key={`${event.year}-${event.title}`}
                initial={{ opacity: 0, x: isLeft ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative flex items-center mb-8 ${
                  isLeft ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Content */}
                <div className={`w-full md:w-1/2 ${isLeft ? "md:pr-12" : "md:pl-12"} pl-12 md:pl-0`}>
                  <div className="card p-5 relative">
                    {/* Year badge */}
                    <span
                      className={`absolute -top-3 ${
                        isLeft ? "right-4" : "left-4"
                      } px-3 py-1 text-xs font-bold rounded-full ${
                        event.color === "accent"
                          ? "bg-accent text-on-accent"
                          : event.color === "accent-secondary"
                          ? "bg-accent-secondary text-white"
                          : "bg-accent-tertiary text-white"
                      }`}
                    >
                      {event.year}
                    </span>

                    <h3
                      className={`font-semibold mb-1 ${
                        event.color === "accent"
                          ? "text-accent"
                          : event.color === "accent-secondary"
                          ? "text-accent-secondary"
                          : "text-accent-tertiary"
                      }`}
                    >
                      {event.title}
                    </h3>
                    <p className="text-text-muted text-sm mb-2">{event.subtitle}</p>
                    <p className="text-text-secondary text-sm">{event.description}</p>
                  </div>
                </div>

                {/* Center dot */}
                <div
                  className={`absolute left-4 md:left-1/2 w-8 h-8 rounded-full flex items-center justify-center transform -translate-x-1/2 ${
                    event.color === "accent"
                      ? "bg-accent"
                      : event.color === "accent-secondary"
                      ? "bg-accent-secondary"
                      : "bg-accent-tertiary"
                  }`}
                >
                  <Icon className="text-on-accent" size={14} />
                </div>

                {/* Empty space for alternating layout */}
                <div className="hidden md:block md:w-1/2" />
              </motion.div>
            );
          })}

          {/* Future indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="relative flex items-center justify-center"
          >
            <div className="absolute left-4 md:left-1/2 w-8 h-8 rounded-full bg-surface border-2 border-dashed border-accent flex items-center justify-center transform -translate-x-1/2">
              <span className="text-accent text-xs font-bold">?</span>
            </div>
            <div className="ml-16 md:ml-0 text-center">
              <p className="text-text-muted text-sm italic">
                Summer 2026 — Open to opportunities
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
