"use client";

import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt, FaDatabase, FaBrain, FaRobot } from "react-icons/fa";

const projects = [
  {
    title: "BTC Cancer Early Detection",
    description:
      "Developed an ML model to predict monthly Bile Tract Cancer diagnoses from a pool of 250M patients. Addressed critical 45-day claims data delay and improved performance using advanced clustering techniques.",
    tech: ["Python", "K-means", "Gaussian Mixtures", "NLP", "Scikit-learn"],
    icon: FaBrain,
    color: "cyan",
    highlights: [
      "250M patient pool analysis",
      "Advanced clustering techniques",
      "Industry conference presentation",
    ],
    period: "Jan 2025 - May 2025",
    org: "ZS Associates",
  },
  {
    title: "Financial RAG Chatbot",
    description:
      "Built an LLM-powered RAG chatbot that answers questions about company financials from SEC filings. Implemented Streamlit UI + FastAPI backend with ChromaDB semantic retrieval.",
    tech: ["Python", "LangChain", "ChromaDB", "FastAPI", "Streamlit", "GPT-4"],
    icon: FaRobot,
    color: "magenta",
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
    description:
      "AI-powered scene understanding and analysis application deployed on Railway. Leverages modern ML techniques for intelligent scene recognition and processing.",
    tech: ["Python", "PyTorch", "Railway", "REST API"],
    icon: FaBrain,
    color: "yellow",
    github: "https://github.com/ARJUNVARMA2000/Scene_AI",
    demo: "https://scence-ai.up.railway.app",
    period: "2025",
    org: "Personal Project",
  },
  {
    title: "Agricultural Product Classification (RAG)",
    description:
      "Built an AI-assisted, retrieval-augmented generation product-classification system for a Series-B East African agtech. Achieved 99% holdout accuracy using GPT-4.",
    tech: ["Python", "GPT-4", "RAG", "REST API", "Dashboard"],
    icon: FaDatabase,
    color: "cyan",
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
  return (
    <section id="projects" className="py-20 px-4 relative">
      <div className="absolute inset-0 grid-bg opacity-30" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-cyber text-3xl md:text-4xl font-bold text-white mb-4">
            <span className="text-cyber-cyan">&lt;</span> Projects{" "}
            <span className="text-cyber-cyan">/&gt;</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyber-cyan to-cyber-magenta mx-auto" />
        </motion.div>

        {/* Projects grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => {
            const Icon = project.icon;
            return (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="cyber-card p-6 rounded-lg group relative overflow-hidden"
              >
                {/* Glow effect on hover */}
                <div
                  className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                    project.color === "cyan"
                      ? "bg-gradient-to-br from-cyber-cyan/5 to-transparent"
                      : project.color === "magenta"
                      ? "bg-gradient-to-br from-cyber-magenta/5 to-transparent"
                      : "bg-gradient-to-br from-cyber-yellow/5 to-transparent"
                  }`}
                />

                <div className="relative z-10">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-3 rounded-lg ${
                          project.color === "cyan"
                            ? "bg-cyber-cyan/10 text-cyber-cyan"
                            : project.color === "magenta"
                            ? "bg-cyber-magenta/10 text-cyber-magenta"
                            : "bg-cyber-yellow/10 text-cyber-yellow"
                        }`}
                      >
                        <Icon size={24} />
                      </div>
                      <div>
                        <h3
                          className={`font-cyber text-lg font-bold ${
                            project.color === "cyan"
                              ? "text-cyber-cyan"
                              : project.color === "magenta"
                              ? "text-cyber-magenta"
                              : "text-cyber-yellow"
                          }`}
                        >
                          {project.title}
                        </h3>
                        <p className="text-gray-500 text-xs">
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
                          className="text-gray-400 hover:text-cyber-cyan transition-colors"
                        >
                          <FaGithub size={20} />
                        </a>
                      )}
                      {project.demo && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-cyber-cyan transition-colors"
                        >
                          <FaExternalLinkAlt size={18} />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Highlights */}
                  {project.highlights && (
                    <ul className="mb-4 space-y-1">
                      {project.highlights.map((highlight) => (
                        <li
                          key={highlight}
                          className="text-gray-400 text-xs flex items-center gap-2"
                        >
                          <span
                            className={`w-1 h-1 rounded-full ${
                              project.color === "cyan"
                                ? "bg-cyber-cyan"
                                : project.color === "magenta"
                                ? "bg-cyber-magenta"
                                : "bg-cyber-yellow"
                            }`}
                          />
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className={`px-2 py-1 text-xs rounded border ${
                          project.color === "cyan"
                            ? "border-cyber-cyan/30 text-cyber-cyan bg-cyber-cyan/5"
                            : project.color === "magenta"
                            ? "border-cyber-magenta/30 text-cyber-magenta bg-cyber-magenta/5"
                            : "border-cyber-yellow/30 text-cyber-yellow bg-cyber-yellow/5"
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
