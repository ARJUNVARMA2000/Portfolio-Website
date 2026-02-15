"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaExternalLinkAlt, FaBrain, FaRobot, FaDatabase, FaTimes, FaChevronRight, FaChrome, FaStar, FaTwitter, FaBook } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";
import Image from "next/image";

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
• Methodology presented at PMSA 2025 conference; model adopted for territory-level resource planning`,
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

  impact: `• Built a multi-model evaluation pipeline using Claude Opus as a judge for response accuracy and relevance
• Successfully integrated multiple years of SEC filings across different companies
• Reduced time-to-insight from hours of manual reading to seconds of conversation
• Implemented automatic ticker and period parsing for streamlined query handling
• Deployed live demo on Streamlit Cloud with persistent conversation history`,
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

const tweetBotCaseStudy = {
  problem: `Social media engagement on X/Twitter requires quick, thoughtful responses that maintain your authentic voice. Crafting the perfect reply, quote tweet, or thread takes time and mental energy—especially when you want to contribute meaningfully to conversations at scale.

The goal was to build an AI assistant that integrates directly into the Twitter experience, providing context-aware suggestions that match your personal style.`,

  challenge: `Building a seamless Twitter AI assistant presented several challenges:

Key challenges:
• Twitter/X's DOM structure is complex and frequently changes, making reliable element detection difficult
• Extracting full context (tweet text, author, thread history, images) requires sophisticated DOM traversal
• Suggestions need to feel authentic and match the user's voice, not generic AI output
• Streaming responses must be smooth and non-disruptive to the browsing experience
• Chrome Extension Manifest V3 restrictions limit background processing capabilities`,

  approach: `The extension was built with deep Twitter integration in mind:

1. DOM Injection: Content scripts that inject AI buttons directly into every tweet's action bar, blending seamlessly with native UI

2. Context Extraction: Sophisticated tweet parser that captures text, author, thread context, and even image content for multimodal understanding

3. Voice Learning: Tracks which suggestions users select over time to learn and adapt to their personal writing style

4. Multi-Model Support: Integration with Claude Opus, Sonnet, and Haiku via OpenRouter for different quality/speed tradeoffs`,

  solution: `The Chrome extension includes:

• Service Worker Backend: Handles API calls, streaming, prompt building, and selection history tracking
• Content Scripts: Orchestrate DOM injection, tweet extraction, and popup UI rendering
• Tone Control System: Five rhetorical modes (witty, professional, casual, provocative, informative) with tagged strategy labels
• Thread Mode: Generate coherent multi-tweet threads on any topic
• Settings Dashboard: Model selection, usage tracking with cost estimates, and export/import functionality

Each suggestion comes with a rhetorical strategy tag (e.g., [contrarian take], [empathy hook]) so users understand the approach behind each option.`,

  impact: `• Generates 3 distinct suggestions per request with different rhetorical angles
• Supports replies, quote tweets, original tweets, and multi-tweet threads
• Image understanding for context-aware responses to visual content
• Voice learning system that improves suggestions over time
• Real-time streaming for instant feedback
• Full privacy—API key and history stored locally, no external data collection`,
};

const citationCheckerCaseStudy = {
  problem: `Academic citation formatting is one of the most tedious and error-prone aspects of scholarly writing. Students and researchers must navigate complex rules across APA 7th, MLA 9th, and Chicago 17th editions—each with hundreds of specific formatting requirements for different source types.

The goal was to build a specialized chatbot that could identify specific formatting violations in citations and reference lists, providing rule-based evidence without rewriting the user's text.`,

  challenge: `Building a reliable citation checker presented unique domain challenges:

Key challenges:
• Each citation style has hundreds of rules with subtle differences (comma placement, italicization, date formats)
• The bot must identify specific violations with rule IDs, not just suggest generic corrections
• Must stay narrowly scoped—redirect off-topic questions about grammar, research quality, or page layout
• Requires safety backstops for crisis language detection
• Evaluation is complex—need both deterministic checks and model-as-judge approaches`,

  approach: `The development followed a rigorous, evaluation-driven approach:

1. Domain Scoping: Carefully defined the narrow domain boundary—citation and reference formatting only—with explicit redirect logic for out-of-scope queries

2. Rule Engineering: Encoded formatting rules for all three major styles with specific rule IDs for traceable violation reporting

3. Vertex AI Integration: Leveraged Gemini 2.0 Flash Lite for fast, cost-effective responses with domain-specific prompting

4. Comprehensive Evaluation: Built a multi-layered eval harness combining deterministic checks, golden-reference comparisons, and rubric-based model-as-judge scoring`,

  solution: `The production system includes:

• FastAPI Backend: RESTful API handling citation analysis with session management
• Vertex AI Integration: Gemini 2.0 Flash Lite model with carefully engineered citation-domain prompts
• Web Interface: Clean UI with style selector (APA/MLA/Chicago) for paste-and-check workflow
• Evaluation Suite: Pytest-based harness with three test types—deterministic rule detection, golden-reference model-as-judge, and rubric-based model-as-judge scoring
• Cloud Run Deployment: Containerized deployment on GCP with public access

The architecture prioritizes precision—each violation is cited with specific rule IDs and quoted evidence from the user's text.`,

  impact: `• Supports all three major citation styles: APA 7th, MLA 9th, Chicago 17th
• Identifies specific violations with rule IDs and quoted evidence
• Successfully deployed on GCP Cloud Run with public access
• Comprehensive eval suite with 30+ test cases across three evaluation methods
• Maintains narrow domain focus with graceful handling of out-of-scope queries
• Built with safety backstops for sensitive content detection`,
};

interface Project {
  title: string;
  subtitle: string;
  description: string;
  tech: string[];
  icon: React.ComponentType<{ size?: number; className?: string }>;
  color: string;
  highlights: string[];
  period: string;
  org: string;
  featured?: boolean;
  caseStudy?: { problem: string; challenge: string; approach: string; solution: string; impact: string };
  github?: string;
  demo?: string;
  orgUrl?: string;
  orgLogo?: string;
}

const projects: Project[] = [
  {
    title: "Biliary Tract Cancer (BTC) Early Detection",
    subtitle: "Predictive Analytics & NLP",
    description:
      "Developed an early detection model across 250M patient claims, enabling ~45-day earlier identification compared to standard diagnosis lag. Engineered a hybrid feature pipeline combining clinical risk factors, K-means and GMM segmentation, and Transformer-based NLP clustering on diagnosis narratives.",
    tech: ["Python", "scikit-learn", "PySpark", "K-means", "GMM", "NLP Clustering"],
    icon: FaBrain,
    color: "purple",
    highlights: [
      "250M patient claims analyzed",
      "Hybrid clinical + NLP feature pipeline",
      "Presented at PMSA 2025; adopted for territory planning",
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
      "Built an LLM-powered RAG chatbot answering company financial questions from SEC filings with line-level citations. Implemented semantic retrieval with ChromaDB and text-embedding-3-large plus automatic ticker and period parsing.",
    tech: ["Python", "FastAPI", "ChromaDB", "Streamlit"],
    icon: FaRobot,
    color: "cyan",
    highlights: [
      "Line-level source citations",
      "Claude Opus evaluation pipeline",
      "Live demo on Streamlit Cloud",
    ],
    github: "https://github.com/ARJUNVARMA2000/Financial-RAG-Chatbot",
    demo: "https://financialrag-chatbot.streamlit.app/",
    period: "Nov 2025 - Dec 2025",
    org: "Columbia University",
    caseStudy: financialRagCaseStudy,
  },
  {
    title: "SeanceAI",
    subtitle: "Conversational AI & Multi-Model LLM",
    description:
      "Built an AI chatbot enabling conversations with 60+ historical figures using multi-model LLM support and streaming responses. Implemented era-appropriate prompt engineering and \"Dinner Party\" mode for multi-figure conversations; deployed on Railway.",
    tech: ["Python", "Flask", "OpenRouter API"],
    icon: FaBrain,
    color: "pink",
    highlights: [
      "60+ historical figures",
      "Multi-model LLM support & streaming",
      "Deployed on Railway",
    ],
    github: "https://github.com/ARJUNVARMA2000/Seance_AI",
    demo: "https://seance-ai.up.railway.app",
    period: "2025",
    org: "Personal Project",
    caseStudy: seanceAiCaseStudy,
  },
  {
    title: "Agricultural Product Standardization & Risk Detection",
    subtitle: "RAG & Classification System",
    description:
      "Built a RAG-augmented classification system at SunCulture (Series B Agtech) categorizing 7M+ farmer transactions across 500+ product categories to support creditworthiness assessment for microloans in East Africa. Achieved 99% accuracy on a 10,000-item holdout set using hybrid rule-based and LLM-assisted classification, reducing manual review volume by 95% and accelerating loan decisioning.",
    tech: ["Python", "RAG", "REST API"],
    icon: FaDatabase,
    color: "purple",
    highlights: [
      "7M+ farmer transactions classified",
      "99% accuracy on 10K holdout set",
      "95% reduction in manual review",
    ],
    period: "Aug 2025 - Oct 2025",
    org: "SunCulture (Internship/Co-op)",
    orgUrl: "https://sunculture.io/",
    orgLogo: "/images/sunculture-logo.png",
  },
  {
    title: "Video Speed Controller",
    subtitle: "Chrome Extension",
    description:
      "Built a Chrome extension for fine-grained video playback speed control across all websites. Features persistent speed memory, keyboard shortcuts, and works with YouTube, Netflix, Udemy, and more.",
    tech: ["JavaScript", "Chrome APIs", "HTML/CSS", "MutationObserver"],
    icon: FaChrome,
    color: "cyan",
    highlights: [
      "Works on all major platforms",
      "0.1x to 16x speed range",
      "Persistent speed memory",
    ],
    github: "https://github.com/ARJUNVARMA2000/Video-Speed-Controller-extension",
    demo: "https://chromewebstore.google.com/detail/video-speed-controller-pr/mahfenfglifhcipcpobblpgdaefigpee",
    period: "2025",
    org: "Personal Project",
    caseStudy: videoSpeedCaseStudy,
  },
  {
    title: "Tweet Bot",
    subtitle: "AI Chrome Extension",
    description:
      "AI-powered Chrome extension that generates tweet replies, quote tweets, and threads using Claude via OpenRouter. Features tone control, image understanding, voice learning that adapts to your style, and real-time streaming responses.",
    tech: ["JavaScript", "Chrome APIs", "CSS", "OpenRouter API"],
    icon: FaTwitter,
    color: "cyan",
    highlights: [
      "3 distinct suggestions with rhetorical strategy tags",
      "Voice learning adapts to your style",
      "Multi-model support (Opus, Sonnet, Haiku)",
    ],
    github: "https://github.com/ARJUNVARMA2000/tweet-bot",
    period: "2026",
    org: "Personal Project",
    caseStudy: tweetBotCaseStudy,
  },
  {
    title: "Citation Format Checker",
    subtitle: "Domain Q&A Chatbot",
    description:
      "Academic citation format checker chatbot supporting APA 7th, MLA 9th, and Chicago 17th editions. Powered by Vertex AI (Gemini 2.0 Flash Lite) and FastAPI, it identifies specific formatting violations with rule IDs and quoted evidence. Deployed on GCP Cloud Run.",
    tech: ["Python", "FastAPI", "Vertex AI", "Google Cloud Run", "Docker"],
    icon: FaBook,
    color: "pink",
    highlights: [
      "Supports APA 7th, MLA 9th, Chicago 17th",
      "Rule-ID based violation detection",
      "30+ eval test cases across 3 methods",
    ],
    github: "https://github.com/ARJUNVARMA2000/citation-format-checker",
    demo: "https://citation-bot-7pj7nolpla-uc.a.run.app",
    period: "2026",
    org: "Columbia University",
    caseStudy: citationCheckerCaseStudy,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  const colorClasses = {
    purple: {
      icon: "text-accent-purple",
      border: "border-accent-purple/20 group-hover:border-accent-purple/50",
      glow: "group-hover:shadow-glow",
      bg: "from-accent-purple/5 via-transparent to-accent-cyan/5",
      dot: "bg-accent-purple",
      badge: "bg-accent-purple/10 text-accent-purple border-accent-purple/30",
    },
    cyan: {
      icon: "text-accent-cyan",
      border: "border-accent-cyan/20 group-hover:border-accent-cyan/50",
      glow: "group-hover:shadow-glow-cyan",
      bg: "from-accent-cyan/5 via-transparent to-accent-pink/5",
      dot: "bg-accent-cyan",
      badge: "bg-accent-cyan/10 text-accent-cyan border-accent-cyan/30",
    },
    pink: {
      icon: "text-accent-pink",
      border: "border-accent-pink/20 group-hover:border-accent-pink/50",
      glow: "group-hover:shadow-glow-pink",
      bg: "from-accent-pink/5 via-transparent to-accent-purple/5",
      dot: "bg-accent-pink",
      badge: "bg-accent-pink/10 text-accent-pink border-accent-pink/30",
    },
  };

  return (
    <>
      <section id="projects" className="section px-6 relative overflow-hidden">
        {/* Background orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="orb orb-purple w-80 h-80 top-40 -right-40 opacity-15" />
          <div className="orb orb-cyan w-64 h-64 bottom-20 left-10 opacity-15" />
          <div className="orb orb-pink w-48 h-48 top-1/3 left-1/4 opacity-10" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
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
              My Work
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Featured <span className="gradient-text">Projects</span>
            </h2>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto">
              From ML models predicting cancer to LLM-powered chatbots
            </p>
          </motion.div>

          {/* Projects grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-6"
          >
            {projects.map((project, index) => {
              const Icon = project.icon;
              const colors = colorClasses[project.color as keyof typeof colorClasses];

              return (
                <motion.div
                  key={project.title}
                  variants={itemVariants}
                  whileHover={{
                    y: -8,
                    transition: { duration: 0.3 }
                  }}
                  className={`card-glow p-6 md:p-8 group cursor-pointer ${colors.border} ${colors.glow} transition-all duration-500 ${project.featured ? "md:col-span-2" : ""}`}
                  style={{ transformStyle: "preserve-3d", perspective: 1000 }}
                >
                  {/* Gradient background on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${colors.bg} rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

                  <div className="relative z-10">
                    {/* Featured badge */}
                    {project.featured && (
                      <div className="mb-4 flex items-center gap-2">
                        <span className="badge badge-glow">
                          <FaStar className="text-yellow-400" size={10} />
                          Featured Case Study
                        </span>
                      </div>
                    )}

                    {/* Header */}
                    <div className="flex items-start justify-between mb-5">
                      <div className="flex items-center gap-4">
                        <div className={`p-4 rounded-2xl bg-surface/50 border border-border/30 ${colors.border} transition-all duration-300`}>
                          <Icon size={24} className={colors.icon} />
                        </div>
                        <div>
                          <h3 className={`text-xl md:text-2xl font-semibold ${colors.icon} mb-1`}>
                            {project.title}
                          </h3>
                          <p className="text-text-muted text-sm">
                            {project.subtitle}
                          </p>
                          <p className="text-text-muted text-xs mt-1 flex items-center gap-1.5">
                            {project.orgLogo && (
                              <span className="relative w-4 h-4 inline-block flex-shrink-0">
                                <Image src={project.orgLogo} alt={project.org} fill className="object-contain" />
                              </span>
                            )}
                            {project.orgUrl ? (
                              <a href={project.orgUrl} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="hover:text-accent-cyan transition-colors underline underline-offset-2">{project.org}</a>
                            ) : (
                              <span>{project.org}</span>
                            )}
                            <span>•</span> {project.period}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {project.github && (
                          <motion.a
                            whileHover={{ scale: 1.1 }}
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="p-2.5 rounded-xl text-text-muted hover:text-accent-cyan hover:bg-accent-cyan/10 transition-all"
                          >
                            <FaGithub size={18} />
                          </motion.a>
                        )}
                        {project.demo && (
                          <motion.a
                            whileHover={{ scale: 1.1 }}
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="p-2.5 rounded-xl text-text-muted hover:text-accent-purple hover:bg-accent-purple/10 transition-all"
                          >
                            <FaExternalLinkAlt size={16} />
                          </motion.a>
                        )}
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-text-secondary mb-5 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Highlights */}
                    {project.highlights && (
                      <ul className="mb-5 space-y-2">
                        {project.highlights.map((highlight) => (
                          <li
                            key={highlight}
                            className="text-text-muted text-sm flex items-center gap-3"
                          >
                            <span className={`w-1.5 h-1.5 rounded-full ${colors.dot}`} />
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Tech stack */}
                    <div className="flex flex-wrap gap-2 mb-5">
                      {project.tech.map((tech) => (
                        <span key={tech} className="tech-pill text-xs">
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Case study button */}
                    {project.caseStudy && (
                      <motion.button
                        whileHover={{ x: 4 }}
                        onClick={() => setSelectedProject(project)}
                        className={`inline-flex items-center gap-2 text-sm ${colors.icon} hover:opacity-80 transition-all font-medium`}
                      >
                        Read Full Case Study
                        <FaChevronRight size={12} />
                      </motion.button>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Case Study Modal */}
      <AnimatePresence>
        {selectedProject?.caseStudy && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-bg/90 backdrop-blur-xl"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 40 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="relative w-full max-w-4xl max-h-[85vh] overflow-y-auto card-glow border border-border/30"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 p-3 rounded-xl bg-surface/80 text-text-muted hover:text-text hover:bg-surface transition-all z-10"
              >
                <FaTimes size={18} />
              </button>

              {/* Header */}
              <div className="sticky top-0 bg-bg/95 backdrop-blur-xl border-b border-border/30 px-8 py-6 z-10">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="badge">Case Study</span>
                  <span className="badge-secondary">{selectedProject.subtitle}</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold gradient-text mb-2">
                  {selectedProject.title}
                </h2>
                <p className="text-text-muted text-sm flex items-center gap-1.5">
                  {selectedProject.orgLogo && (
                    <span className="relative w-5 h-5 inline-block flex-shrink-0">
                      <Image src={selectedProject.orgLogo} alt={selectedProject.org} fill className="object-contain" />
                    </span>
                  )}
                  {selectedProject.orgUrl ? (
                    <a href={selectedProject.orgUrl} target="_blank" rel="noopener noreferrer" className="hover:text-accent-cyan transition-colors underline underline-offset-2">{selectedProject.org}</a>
                  ) : (
                    <span>{selectedProject.org}</span>
                  )}
                  <span>•</span> {selectedProject.period}
                </p>
              </div>

              {/* Content */}
              <div className="px-8 py-8 space-y-10">
                {/* Problem */}
                <div>
                  <h3 className="text-xl font-semibold text-text mb-4 flex items-center gap-3">
                    <span className="w-3 h-3 rounded-full bg-accent-purple" />
                    The Problem
                  </h3>
                  <p className="text-text-secondary leading-relaxed whitespace-pre-line">
                    {selectedProject.caseStudy.problem}
                  </p>
                </div>

                {/* Challenge */}
                <div>
                  <h3 className="text-xl font-semibold text-text mb-4 flex items-center gap-3">
                    <span className="w-3 h-3 rounded-full bg-accent-cyan" />
                    The Challenge
                  </h3>
                  <p className="text-text-secondary leading-relaxed whitespace-pre-line">
                    {selectedProject.caseStudy.challenge}
                  </p>
                </div>

                {/* Approach */}
                <div>
                  <h3 className="text-xl font-semibold text-text mb-4 flex items-center gap-3">
                    <span className="w-3 h-3 rounded-full bg-accent-pink" />
                    The Approach
                  </h3>
                  <p className="text-text-secondary leading-relaxed whitespace-pre-line">
                    {selectedProject.caseStudy.approach}
                  </p>
                </div>

                {/* Solution */}
                <div>
                  <h3 className="text-xl font-semibold text-text mb-4 flex items-center gap-3">
                    <span className="w-3 h-3 rounded-full bg-accent-purple" />
                    The Solution
                  </h3>
                  <p className="text-text-secondary leading-relaxed whitespace-pre-line">
                    {selectedProject.caseStudy.solution}
                  </p>
                </div>

                {/* Impact */}
                <div>
                  <h3 className="text-xl font-semibold text-text mb-4 flex items-center gap-3">
                    <span className="w-3 h-3 rounded-full bg-accent-cyan" />
                    The Impact
                  </h3>
                  <p className="text-text-secondary leading-relaxed whitespace-pre-line">
                    {selectedProject.caseStudy.impact}
                  </p>
                </div>

                {/* Tech Stack */}
                <div className="pt-6 border-t border-border/30">
                  <h3 className="text-sm font-medium text-text-muted mb-4 uppercase tracking-[0.2em]">
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
