"use client";

import { motion } from "framer-motion";
import { FaBriefcase } from "react-icons/fa";

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
    color: "accent",
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
      "Received Client Comrade Award for outstanding client outcomes and feedback",
    ],
    color: "accent-secondary",
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
    color: "accent-secondary",
    promoted: true,
  },
];

export default function Experience() {
  return (
    <section id="experience" className="section section-alt px-6">
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
            Work <span className="gradient-text">Experience</span>
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            3+ years of building data-driven solutions at scale
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-0 md:left-8 top-0 bottom-0 w-px bg-border" />

          {experiences.map((exp, index) => (
            <motion.div
              key={exp.period}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative pl-8 md:pl-20 pb-12 last:pb-0"
            >
              {/* Timeline dot */}
              <div
                className={`absolute left-0 md:left-8 top-2 w-3 h-3 rounded-full -translate-x-1/2 ring-4 ring-bg-secondary ${
                  exp.color === "accent"
                    ? "bg-accent"
                    : "bg-accent-secondary"
                }`}
              />

              {/* Card */}
              <div className="card p-6">
                <div className="flex items-start gap-3 mb-4">
                  <div
                    className={`p-2.5 rounded-xl flex-shrink-0 ${
                      exp.color === "accent"
                        ? "bg-accent/10"
                        : "bg-accent-secondary/10"
                    }`}
                  >
                    <FaBriefcase
                      className={
                        exp.color === "accent"
                          ? "text-accent"
                          : "text-accent-secondary"
                      }
                      size={16}
                    />
                  </div>
                  <div>
                    <h3
                      className={`font-semibold ${
                        exp.color === "accent"
                          ? "text-accent"
                          : "text-accent-secondary"
                      }`}
                    >
                      {exp.title}
                    </h3>
                    <p className="text-text font-medium">{exp.company}</p>
                    <p className="text-text-muted text-sm">
                      {exp.location} | {exp.period}
                    </p>
                  </div>
                </div>

                <ul className="space-y-3">
                  {exp.highlights.map((highlight, i) => (
                    <li
                      key={i}
                      className="text-text-secondary text-sm flex items-start gap-3"
                    >
                      <span
                        className={`mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                          exp.color === "accent"
                            ? "bg-accent"
                            : "bg-accent-secondary"
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
