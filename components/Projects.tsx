"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaGithub, FaBrain, FaRobot, FaDatabase,
  FaTimes, FaChevronRight, FaChrome, FaStar, FaTwitter, FaBook, FaPlay,
  FaCode, FaLaptopCode, FaMicrochip, FaServer, FaGamepad,
  FaMobileAlt, FaCloud, FaChartLine, FaLock, FaCog, FaFlask,
  FaNetworkWired, FaPython, FaReact, FaDocker, FaAws,
} from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";
import Image from "next/image";
import { projects as projectsData, type ProjectData } from "@/data/projects";

type IconComponent = React.ComponentType<{ size?: number; className?: string }>;

const iconMap: Record<string, IconComponent> = {
  FaBrain, FaRobot, FaDatabase, FaChrome, FaTwitter, FaBook,
  FaCode, FaLaptopCode, FaMicrochip, FaServer, FaGamepad,
  FaMobileAlt, FaCloud, FaChartLine, FaLock, FaCog, FaFlask,
  FaNetworkWired, FaPython, FaReact, FaDocker, FaAws,
};

function resolveIcon(iconName: string): IconComponent {
  return iconMap[iconName] || FaCode;
}

const projects = projectsData.map((p) => ({
  ...p,
  icon: resolveIcon(p.iconName),
}));

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
                        {!project.github && !project.demo && project.orgUrl && project.orgLogo && (
                          <motion.a
                            whileHover={{ scale: 1.1 }}
                            href={project.orgUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="p-2 rounded-xl hover:bg-accent-cyan/10 transition-all"
                          >
                            <span className="relative w-6 h-6 block">
                              <Image src={project.orgLogo} alt={project.org} fill className="object-contain" />
                            </span>
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

                    {/* Links: Live Demo + Case Study */}
                    <div className="flex flex-wrap items-center gap-4">
                      {project.demo && (
                        <motion.a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          whileHover={{ scale: 1.04 }}
                          whileTap={{ scale: 0.97 }}
                          className={`inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-full ${colors.badge} transition-all`}
                        >
                          <span className="relative flex h-2 w-2">
                            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${colors.dot} opacity-75`} />
                            <span className={`relative inline-flex rounded-full h-2 w-2 ${colors.dot}`} />
                          </span>
                          Live Demo
                          <FaPlay size={10} />
                        </motion.a>
                      )}
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
