"use client";

import { motion } from "framer-motion";
import { FaBriefcase, FaStar, FaRocket } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";

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
    color: "purple",
    icon: FaRocket,
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
    color: "cyan",
    icon: FaStar,
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
    color: "pink",
    icon: FaBriefcase,
    promoted: true,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

export default function Experience() {
  return (
    <section id="experience" className="section section-alt px-6 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="orb orb-cyan w-96 h-96 -top-48 left-1/4 opacity-15" />
        <div className="orb orb-pink w-72 h-72 bottom-20 right-10 opacity-15" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="badge mb-4 inline-flex">
            <HiSparkles className="text-accent-cyan" />
            Career Journey
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Work <span className="gradient-text">Experience</span>
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            3+ years of building data-driven solutions at scale
          </p>
        </motion.div>

        {/* Timeline */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative"
        >
          {/* Gradient timeline line */}
          <div className="absolute left-4 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-accent-purple via-accent-cyan to-accent-pink" />

          {experiences.map((exp, index) => {
            const Icon = exp.icon;
            const colorMap = {
              purple: {
                dot: "bg-accent-purple shadow-glow",
                icon: "text-accent-purple",
                border: "border-accent-purple/30 hover:border-accent-purple/50",
                bg: "from-accent-purple/10 to-transparent",
                badge: "bg-accent-purple/10 text-accent-purple border-accent-purple/30",
              },
              cyan: {
                dot: "bg-accent-cyan shadow-glow-cyan",
                icon: "text-accent-cyan",
                border: "border-accent-cyan/30 hover:border-accent-cyan/50",
                bg: "from-accent-cyan/10 to-transparent",
                badge: "bg-accent-cyan/10 text-accent-cyan border-accent-cyan/30",
              },
              pink: {
                dot: "bg-accent-pink shadow-glow-pink",
                icon: "text-accent-pink",
                border: "border-accent-pink/30 hover:border-accent-pink/50",
                bg: "from-accent-pink/10 to-transparent",
                badge: "bg-accent-pink/10 text-accent-pink border-accent-pink/30",
              },
            };
            const colorClasses = colorMap[exp.color as keyof typeof colorMap];

            return (
              <motion.div
                key={exp.period}
                variants={itemVariants}
                className="relative pl-12 md:pl-20 pb-12 last:pb-0"
              >
                {/* Timeline dot with glow */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1, type: "spring" }}
                  className={`absolute left-4 md:left-8 top-2 w-4 h-4 rounded-full -translate-x-1/2 ${colorClasses.dot}`}
                >
                  <div className={`absolute inset-0 rounded-full animate-ping ${colorClasses.dot} opacity-30`} />
                </motion.div>

                {/* Card */}
                <div className={`card-glow p-6 md:p-8 border ${colorClasses.border} transition-all duration-300 group`}>
                  {/* Gradient overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${colorClasses.bg} rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none`} />

                  <div className="relative z-10">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-start gap-4 mb-5">
                      <div className={`p-3 rounded-xl bg-surface/50 border border-border/30 flex-shrink-0`}>
                        <Icon className={colorClasses.icon} size={20} />
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <h3 className={`text-lg md:text-xl font-semibold ${colorClasses.icon}`}>
                            {exp.title}
                          </h3>
                          {exp.award && (
                            <span className={`text-xs px-2 py-1 rounded-full border ${colorClasses.badge}`}>
                              Award Winner
                            </span>
                          )}
                          {exp.promoted && (
                            <span className={`text-xs px-2 py-1 rounded-full border ${colorClasses.badge}`}>
                              Fast Track
                            </span>
                          )}
                        </div>
                        <p className="text-text font-medium">{exp.company}</p>
                        <p className="text-text-muted text-sm">
                          {exp.location} • {exp.period}
                        </p>
                      </div>
                    </div>

                    {/* Highlights */}
                    <ul className="space-y-3">
                      {exp.highlights.map((highlight, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: 0.3 + i * 0.05 }}
                          className="text-text-secondary text-sm flex items-start gap-3"
                        >
                          <span className={`mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0 ${colorClasses.dot}`} />
                          {highlight}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
