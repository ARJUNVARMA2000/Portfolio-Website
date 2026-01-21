"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaExternalLinkAlt, FaBrain, FaRobot, FaDatabase, FaTimes, FaChevronRight, FaChrome } from "react-icons/fa";

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

const financialRagCaseStudy = {
  problem: `Financial analysts and investors spend countless hours manually sifting through SEC filings (10-K, 10-Q, 8-K) to extract key insights about company performance, risk factors, and management discussions. These documents are dense, lengthy (often 100+ pages), and written in complex legal/financial language.

The challenge was to build an intelligent assistant that could answer natural language questions about company financials with accurate, source-grounded responses—eliminating hallucinations that plague standard LLM approaches.`,

  challenge: `Building a reliable financial Q&A system presented several technical hurdles:

Key challenges:
• SEC filings contain complex nested structures (tables, footnotes, cross-references)
• Financial data requires precise numerical accuracy—approximations are unacceptable
• Context windows are limited, but relevant information may span multiple document sections
• Need to handle both quantitative queries ("What was Q3 revenue?") and qualitative ones ("What are the main risk factors?")
• Responses must cite sources to maintain trust and auditability`,

  approach: `We implemented a Retrieval-Augmented Generation (RAG) architecture with several key innovations:

1. Document Processing Pipeline: Used SEC-EDGAR APIs to fetch filings, then applied intelligent chunking that respects document structure (preserving tables, section boundaries)

2. Semantic Search Layer: ChromaDB vector store with OpenAI embeddings for semantic retrieval, combined with metadata filtering (company, filing date, section type)

3. Multi-stage Retrieval: Initial broad retrieval followed by reranking to surface the most relevant chunks for each query

4. Prompt Engineering: Carefully designed prompts that instruct GPT-4 to only answer from retrieved context and explicitly cite sources`,

  solution: `The final system architecture consisted of:

• FastAPI Backend: RESTful API handling document ingestion, query processing, and response generation
• Streamlit Frontend: Interactive chat interface with conversation history and source highlighting
• ChromaDB: Persistent vector store with company/filing metadata for filtered retrieval
• LangChain Orchestration: Managed the RAG pipeline, conversation memory, and chain-of-thought reasoning

Quality assurance was built-in using OpenEval framework to automatically score response quality, relevance, and faithfulness to source documents.`,

  impact: `• Achieved 4.5/5 quality score on OpenEval benchmark for response accuracy and relevance
• Successfully integrated multiple years of SEC filings across different companies
• Reduced time-to-insight from hours of manual reading to seconds of conversation
• Demonstrated zero hallucination rate on factual financial queries through strict RAG grounding
• Built modular architecture that can easily extend to other document types (earnings calls, analyst reports)`,
};

const seanceAiCaseStudy = {
  problem: `History education often feels distant and abstract. Students read about historical figures in textbooks, but rarely get to experience their personalities, perspectives, or thought processes. Traditional learning methods don't capture the authentic voices and contextual knowledge of historical figures.

The goal was to create an immersive, educational experience that brings history to life through authentic AI-powered conversations with legendary figures from different eras.`,

  challenge: `Building an authentic historical conversation system presented several unique challenges:

Key challenges:
• Creating believable personas that speak in era-appropriate language and knowledge
• Ensuring historical figures don't know about events after their death (temporal knowledge boundaries)
• Designing engaging UI/UX that feels like a museum experience, not just another chatbot
• Implementing multi-figure conversations where multiple historical personalities interact naturally
• Managing API costs and rate limits while providing smooth streaming responses
• Handling model fallbacks gracefully when primary models hit rate limits`,

  approach: `The development followed a user-centric, iterative approach:

1. Historical Research: Studied documented sources to capture authentic personalities, speaking styles, and knowledge boundaries for 60+ figures

2. Dual Conversation Modes: Built both Seance Mode (one-on-one) and Dinner Party Mode (2-5 figures) to offer different interaction experiences

3. Smart Model Selection: Integrated OpenRouter API with intelligent fallback system—primary free models (Gemini 2.0 Flash) with premium fallbacks (GPT-4o, Claude Sonnet 4)

4. Museum-Themed Design: Created elegant dark UI with gold accents, SVG portraits, and smooth animations that make conversations feel special

5. Progressive Features: Added contextual suggestions, conversation history, save/resume functionality, and export options`,

  solution: `The production system includes:

• Flask Backend: RESTful API with Server-Sent Events (SSE) for streaming responses and intelligent retry logic
• OpenRouter Integration: Flexible AI model access with automatic fallback handling
• 60+ Historical Figures: Carefully crafted personas across Ancient World, Renaissance, 19th Century, and Modern Era
• Interactive Web Interface: Responsive museum-themed UI with figure selection, conversation history, and multi-mode support
• Railway Deployment: Containerized Flask app with environment-based configuration

The architecture prioritizes authenticity—each figure maintains their unique voice, era-appropriate knowledge, and genuine reactions to modern concepts.`,

  impact: `• Successfully deployed to production on Railway with reliable uptime
• Features 60+ historical figures across multiple eras with authentic personalities
• Supports both intimate one-on-one conversations and dynamic multi-figure dinner parties
• Provides educational value for history learning, critical thinking, and creative writing
• Demonstrates full-stack development skills from AI integration to production deployment
• Open-source project that others can learn from and contribute to`,
};

const videoSpeedCaseStudy = {
  problem: `Online learning has exploded, but video platforms often have limited playback speed options (typically 0.5x to 2x). Power users watching lectures, tutorials, or long-form content want finer control—speeds like 1.25x, 1.75x, or even 3x+ for review sessions.

Additionally, many streaming platforms reset speed settings between videos or don't remember user preferences, creating friction for consistent viewing experiences.`,

  challenge: `Building a reliable video speed controller for modern web involved several challenges:

Key challenges:
• Different sites structure their video players differently (native HTML5, custom wrappers, shadow DOM)
• Some platforms actively reset playbackRate on video load or segment changes
• DRM-protected content may restrict speed modifications
• Need to work seamlessly across YouTube, Netflix, Coursera, Udemy, and arbitrary sites
• Keyboard shortcuts must not conflict with existing site shortcuts`,

  approach: `The extension was built with broad compatibility in mind:

1. Content Script Injection: Inject scripts that locate all video elements on the page, including dynamically loaded ones

2. MutationObserver Pattern: Watch for new video elements being added to the DOM and automatically apply speed settings

3. Persistent Storage: Use Chrome's storage API to remember speed preferences per-site and globally

4. Non-intrusive UI: Overlay controls that appear on hover without disrupting the viewing experience

5. Keyboard Shortcuts: Configurable hotkeys for quick speed adjustments during playback`,

  solution: `The Chrome extension includes:

• Background Service Worker: Manages extension state and cross-tab communication
• Content Scripts: Injected into pages to control video elements and display UI overlay
• Options Page: Configure default speed, keyboard shortcuts, and per-site preferences
• Speed Memory: Automatically applies preferred speed to new videos without manual intervention

The implementation uses the standard HTMLMediaElement.playbackRate API with fallbacks for edge cases where sites try to override user settings.`,

  impact: `• Works across major platforms including YouTube, Netflix, Udemy, Coursera, and generic HTML5 videos
• Allows fine-grained speed control from 0.1x to 16x in customizable increments
• Remembers preferences across sessions and sites for frictionless experience
• Lightweight with minimal performance overhead
• Practical tool used daily for accelerated learning and content consumption`,
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
    github: "https://github.com/ARJUNVARMA2000/Financial-RAG-Chatbot",
    demo: "https://financialrag-chatbot.streamlit.app/",
    period: "Nov 2025 - Dec 2025",
    org: "Columbia University",
    caseStudy: financialRagCaseStudy,
  },
  {
    title: "SeanceAI",
    subtitle: "Conversational AI & Historical Roleplay",
    description:
      "A digital séance platform where you can converse with 60+ historical figures. Features Seance Mode (one-on-one) and Dinner Party Mode (multi-figure conversations) with authentic, era-appropriate personalities and knowledge.",
    tech: ["Python", "Flask", "OpenRouter API", "JavaScript", "Railway", "SSE"],
    icon: FaBrain,
    color: "accent-secondary",
    highlights: [
      "60+ historical figures across eras",
      "Dual conversation modes",
      "Museum-themed UI design",
    ],
    github: "https://github.com/ARJUNVARMA2000/Seance_AI",
    demo: "https://seance-ai.up.railway.app",
    period: "2025",
    org: "Personal Project",
    caseStudy: seanceAiCaseStudy,
  },
  {
    title: "Agricultural Product Classification",
    subtitle: "RAG & Classification System",
    description:
      "Built an AI-powered product classification system for an East African agricultural marketplace, helping farmers categorize crops for compliance and pricing. Achieved 99% holdout accuracy using GPT-4 with RAG.",
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
  {
    title: "Video Speed Controller",
    subtitle: "Chrome Extension",
    description:
      "Built a Chrome extension for fine-grained video playback speed control across all websites. Features persistent speed memory, keyboard shortcuts, and works with YouTube, Netflix, Udemy, and more.",
    tech: ["JavaScript", "Chrome APIs", "HTML/CSS", "MutationObserver"],
    icon: FaChrome,
    color: "accent-secondary",
    highlights: [
      "Works on all major platforms",
      "0.1x to 16x speed range",
      "Persistent speed memory",
    ],
    github: "https://github.com/ARJUNVARMA2000/Video-Speed-Controller-extension",
    period: "2025",
    org: "Personal Project",
    caseStudy: videoSpeedCaseStudy,
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
                  whileHover={{
                    scale: 1.02,
                    rotateX: -2,
                    rotateY: 2,
                    transition: { duration: 0.2 }
                  }}
                  style={{ transformStyle: "preserve-3d", perspective: 1000 }}
                  className={`card p-6 group cursor-pointer hover:shadow-2xl hover:shadow-accent/10 ${project.featured ? "md:col-span-2 ring-1 ring-accent/20" : ""}`}
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
                            : "bg-accent-secondary/10"
                        }`}
                      >
                        <Icon
                          size={20}
                          className={
                            project.color === "accent"
                              ? "text-accent"
                              : "text-accent-secondary"
                          }
                        />
                      </div>
                      <div>
                        <h3
                          className={`font-semibold ${
                            project.color === "accent"
                              ? "text-accent"
                              : "text-accent-secondary"
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
                                : "bg-accent-secondary"
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
                  <span className="badge-secondary">{selectedProject.subtitle}</span>
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
                    <span className="w-2 h-2 rounded-full bg-accent" />
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
