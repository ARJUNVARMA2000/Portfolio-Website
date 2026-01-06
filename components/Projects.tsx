"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaExternalLinkAlt, FaBrain, FaRobot, FaDatabase, FaTimes, FaChevronRight } from "react-icons/fa";

const btcCaseStudy = {
  problem: `Bile Tract Cancer (BTC) is a rare form of cancer with very few approved treatments. Our client's oncology drug was a new method of treatment that had become the standard of care for BTC, but because of its rarity, it was difficult to know which oncologists/urologists to educate.

Because BTC is rare and presents with non-specific symptoms, patients are often misdiagnosed with other cancers or more common ailments. Once BTC is accurately identified, treatment typically begins immediately due to the aggressive nature of the disease. The drug had to be given as the first treatment post-diagnosis—switching later was not an option.`,

  challenge: `The medical and pharmacy claims data we could use had a consistent 45-day delay from the occurrence of events. By the time a patient showed up in the data, treatment had usually already started.

Key challenges:
• Severe class imbalance (BTC is extremely rare)
• Noisy and incomplete claims data (~50% capture of all real-world claims)
• Risk of temporal leakage when using future information to predict earlier risk
• Dataset of tens of millions of rows across hundreds of thousands of patients`,

  approach: `We framed the problem as a time-indexed prediction task: for each patient-month cohort, estimate the probability of a BTC diagnosis in the next 30 days.

To reduce ~250M patient records per month to a manageable subset, we combined:
1. Direct rule-based filtering using diagnosis/procedure flags
2. Advanced clustering techniques (K-means and Gaussian Mixtures)
3. NLP-based event clustering of claim sequences to identify patients whose journeys resembled known BTC trajectories

We deliberately masked the most recent 45 days of data before each index date to simulate real-time conditions and prevent temporal leakage.`,

  solution: `For modeling, we used XGBoost with class-weighted loss to address imbalance. Key features included:
• Diagnosis codes, procedures, and drug regimens
• Provider patterns and utilization metrics
• SHAP values for explainability (critical for non-technical stakeholders)
• MLflow for model versioning and drift monitoring

The pipeline was productionized to process new claims refreshes automatically at a monthly cadence, with model outputs exposed through summary tables and dashboards used by field teams.`,

  impact: `• Substantial lift in early BTC case identification versus heuristic rules
• Clinician-acceptable precision with interpretable feature effects
• Positive feedback from Marketing teams on usefulness
• Client decided to fund similar implementations across other Tumors/Brands
• Approach was shared by our client at an industry conference on utilizing AI to improve patient outcomes`,
};

const projects = [
  {
    title: "BTC Cancer Early Detection",
    subtitle: "Anomaly Detection & Predictive Analytics",
    description:
      "Developed an ML model to predict monthly Bile Tract Cancer diagnoses from a pool of 250M patients. Addressed critical 45-day claims data delay and improved performance using advanced clustering techniques.",
    tech: ["XGBoost", "K-means", "NLP Clustering", "SHAP", "MLflow", "PySpark"],
    icon: FaBrain,
    color: "accent",
    highlights: [
      "250M patient pool analysis",
      "Advanced clustering techniques",
      "Industry conference presentation",
    ],
    period: "Jan 2025 - May 2025",
    org: "ZS Associates",
    featured: true,
    caseStudy: btcCaseStudy,
  },
  {
    title: "Financial RAG Chatbot",
    subtitle: "LLM & Information Retrieval",
    description:
      "Built an LLM-powered RAG chatbot that answers questions about company financials from SEC filings. Implemented Streamlit UI + FastAPI backend with ChromaDB semantic retrieval.",
    tech: ["Python", "LangChain", "ChromaDB", "FastAPI", "Streamlit", "GPT-4"],
    icon: FaRobot,
    color: "accent-secondary",
    highlights: [
      "4.5/5 quality score via OpenEval",
      "SEC filings integration",
      "Semantic search with ChromaDB",
    ],
    github: "https://github.com/ARJUNVARMA2000/Financial_RAG_Chatbot",
    period: "Nov 2025 - Dec 2025",
    org: "Columbia University",
  },
  {
    title: "Scene-AI",
    subtitle: "Computer Vision & Deep Learning",
    description:
      "AI-powered scene understanding and analysis application deployed on Railway. Leverages modern ML techniques for intelligent scene recognition and processing.",
    tech: ["Python", "PyTorch", "Railway", "REST API"],
    icon: FaBrain,
    color: "accent-tertiary",
    github: "https://github.com/ARJUNVARMA2000/Scene_AI",
    demo: "https://scence-ai.up.railway.app",
    period: "2025",
    org: "Personal Project",
  },
  {
    title: "Agricultural Product Classification",
    subtitle: "RAG & Classification System",
    description:
      "Built an AI-assisted, retrieval-augmented generation product-classification system for a Series-B East African agtech. Achieved 99% holdout accuracy using GPT-4.",
    tech: ["Python", "GPT-4", "RAG", "REST API", "Dashboard"],
    icon: FaDatabase,
    color: "accent",
    highlights: [
      "99% holdout accuracy",
      "Real-time REST API",
      "Compliance & risk alerts",
    ],
    period: "Aug 2025 - Oct 2025",
    org: "Columbia University",
  },
];

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  return (
    <>
      <section id="projects" className="section px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Featured <span className="gradient-text">Projects</span>
            </h2>
            <p className="text-text-secondary max-w-2xl mx-auto">
              From ML models predicting cancer to LLM-powered chatbots
            </p>
          </motion.div>

          {/* Projects grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((project, index) => {
              const Icon = project.icon;
              return (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`card p-6 group ${project.featured ? "md:col-span-2 ring-1 ring-accent/20" : ""}`}
                >
                  {/* Featured badge */}
                  {project.featured && (
                    <div className="mb-4">
                      <span className="badge">Featured Case Study</span>
                    </div>
                  )}

                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-3 rounded-xl ${
                          project.color === "accent"
                            ? "bg-accent/10"
                            : project.color === "accent-secondary"
                            ? "bg-accent-secondary/10"
                            : "bg-accent-tertiary/10"
                        }`}
                      >
                        <Icon
                          size={20}
                          className={
                            project.color === "accent"
                              ? "text-accent"
                              : project.color === "accent-secondary"
                              ? "text-accent-secondary"
                              : "text-accent-tertiary"
                          }
                        />
                      </div>
                      <div>
                        <h3
                          className={`font-semibold ${
                            project.color === "accent"
                              ? "text-accent"
                              : project.color === "accent-secondary"
                              ? "text-accent-secondary"
                              : "text-accent-tertiary"
                          }`}
                        >
                          {project.title}
                        </h3>
                        <p className="text-text-muted text-xs">
                          {project.subtitle}
                        </p>
                        <p className="text-text-muted text-xs mt-0.5">
                          {project.org} | {project.period}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-lg text-text-muted hover:text-accent hover:bg-accent/10 transition-all"
                        >
                          <FaGithub size={18} />
                        </a>
                      )}
                      {project.demo && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-lg text-text-muted hover:text-accent hover:bg-accent/10 transition-all"
                        >
                          <FaExternalLinkAlt size={16} />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-text-secondary text-sm mb-4 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Highlights */}
                  {project.highlights && (
                    <ul className="mb-4 space-y-1.5">
                      {project.highlights.map((highlight) => (
                        <li
                          key={highlight}
                          className="text-text-muted text-xs flex items-center gap-2"
                        >
                          <span
                            className={`w-1 h-1 rounded-full ${
                              project.color === "accent"
                                ? "bg-accent"
                                : project.color === "accent-secondary"
                                ? "bg-accent-secondary"
                                : "bg-accent-tertiary"
                            }`}
                          />
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech) => (
                      <span key={tech} className="tech-pill text-xs">
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Case study button */}
                  {project.caseStudy && (
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="inline-flex items-center gap-2 text-sm text-accent hover:text-accent/80 transition-colors group/btn"
                    >
                      Read Full Case Study
                      <FaChevronRight size={12} className="group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Case Study Modal */}
      <AnimatePresence>
        {selectedProject?.caseStudy && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-4xl max-h-[85vh] overflow-y-auto bg-bg border border-border rounded-2xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 p-2 rounded-lg bg-surface text-text-muted hover:text-text transition-colors z-10"
              >
                <FaTimes size={18} />
              </button>

              {/* Header */}
              <div className="sticky top-0 bg-bg/95 backdrop-blur-sm border-b border-border px-8 py-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="badge">Case Study</span>
                  <span className="badge-secondary">Anomaly Detection</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-accent mb-2">
                  {selectedProject.title}
                </h2>
                <p className="text-text-muted text-sm">
                  {selectedProject.org} | {selectedProject.period}
                </p>
              </div>

              {/* Content */}
              <div className="px-8 py-6 space-y-8">
                {/* Problem */}
                <div>
                  <h3 className="text-lg font-semibold text-text mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-accent" />
                    The Problem
                  </h3>
                  <p className="text-text-secondary leading-relaxed whitespace-pre-line">
                    {selectedProject.caseStudy.problem}
                  </p>
                </div>

                {/* Challenge */}
                <div>
                  <h3 className="text-lg font-semibold text-text mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-accent-secondary" />
                    The Challenge
                  </h3>
                  <p className="text-text-secondary leading-relaxed whitespace-pre-line">
                    {selectedProject.caseStudy.challenge}
                  </p>
                </div>

                {/* Approach */}
                <div>
                  <h3 className="text-lg font-semibold text-text mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-accent-tertiary" />
                    The Approach
                  </h3>
                  <p className="text-text-secondary leading-relaxed whitespace-pre-line">
                    {selectedProject.caseStudy.approach}
                  </p>
                </div>

                {/* Solution */}
                <div>
                  <h3 className="text-lg font-semibold text-text mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-accent" />
                    The Solution
                  </h3>
                  <p className="text-text-secondary leading-relaxed whitespace-pre-line">
                    {selectedProject.caseStudy.solution}
                  </p>
                </div>

                {/* Impact */}
                <div>
                  <h3 className="text-lg font-semibold text-text mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-accent-secondary" />
                    The Impact
                  </h3>
                  <p className="text-text-secondary leading-relaxed whitespace-pre-line">
                    {selectedProject.caseStudy.impact}
                  </p>
                </div>

                {/* Tech Stack */}
                <div className="pt-4 border-t border-border">
                  <h3 className="text-sm font-medium text-text-muted mb-3 uppercase tracking-wider">
                    Technologies Used
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tech.map((tech) => (
                      <span key={tech} className="tech-pill">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
