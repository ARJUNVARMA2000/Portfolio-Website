"use client";

import { motion } from "framer-motion";
import {
  FaPython,
  FaAws,
  FaGitAlt,
  FaDocker,
  FaRProject,
} from "react-icons/fa";
import {
  SiPytorch,
  SiPandas,
  SiNumpy,
  SiScikitlearn,
  SiApachespark,
  SiDatabricks,
  SiJupyter,
  SiMlflow,
  SiStreamlit,
} from "react-icons/si";
import { TbBrandCpp, TbSql } from "react-icons/tb";
import { HiSparkles } from "react-icons/hi";

const skillCategories = [
  {
    title: "Programming",
    description: "Core languages I work with daily",
    color: "purple",
    skills: [
      { name: "Python", icon: FaPython },
      { name: "SQL", icon: TbSql },
      { name: "C++", icon: TbBrandCpp },
      { name: "R", icon: FaRProject },
    ],
  },
  {
    title: "Analytics & ML",
    description: "ML frameworks and data tools",
    color: "cyan",
    skills: [
      { name: "PyTorch", icon: SiPytorch },
      { name: "Scikit-learn", icon: SiScikitlearn },
      { name: "Pandas", icon: SiPandas },
      { name: "NumPy", icon: SiNumpy },
    ],
  },
  {
    title: "Big Data & MLOps",
    description: "Scalable infrastructure tools",
    color: "pink",
    skills: [
      { name: "PySpark", icon: SiApachespark },
      { name: "Databricks", icon: SiDatabricks },
      { name: "MLflow", icon: SiMlflow },
      { name: "AWS", icon: FaAws },
    ],
  },
  {
    title: "Tools & Platforms",
    description: "Development environment",
    color: "blue",
    skills: [
      { name: "Git", icon: FaGitAlt },
      { name: "Jupyter", icon: SiJupyter },
      { name: "Streamlit", icon: SiStreamlit },
      { name: "Docker", icon: FaDocker },
    ],
  },
];

const additionalSkills = [
  "Classification",
  "Regression",
  "NLP",
  "Clustering",
  "Model Evaluation",
  "LLMs/RAG",
  "Prompt Engineering",
  "ETL/ELT",
  "SHAP",
  "matplotlib",
  "BeautifulSoup",
  "S3",
  "EMR",
  "Athena",
  "SageMaker",
  "Linux",
  "CI/CD",
  "Jira",
  "Confluence",
  "Claude Code",
  "Cursor IDE",
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

export default function Skills() {
  const colorClasses = {
    purple: {
      icon: "text-accent-purple",
      border: "border-accent-purple/20 hover:border-accent-purple/50",
      glow: "hover:shadow-glow",
      bg: "from-accent-purple/5 to-transparent",
      dot: "bg-accent-purple",
    },
    cyan: {
      icon: "text-accent-cyan",
      border: "border-accent-cyan/20 hover:border-accent-cyan/50",
      glow: "hover:shadow-glow-cyan",
      bg: "from-accent-cyan/5 to-transparent",
      dot: "bg-accent-cyan",
    },
    pink: {
      icon: "text-accent-pink",
      border: "border-accent-pink/20 hover:border-accent-pink/50",
      glow: "hover:shadow-glow-pink",
      bg: "from-accent-pink/5 to-transparent",
      dot: "bg-accent-pink",
    },
    blue: {
      icon: "text-accent-blue",
      border: "border-accent-blue/20 hover:border-accent-blue/50",
      glow: "hover:shadow-[0_0_40px_rgb(59_130_246/0.25)]",
      bg: "from-accent-blue/5 to-transparent",
      dot: "bg-accent-blue",
    },
  };

  return (
    <section id="skills" className="section section-alt px-6 relative overflow-hidden">
      {/* Background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="orb orb-purple w-80 h-80 top-20 -left-40 opacity-15" />
        <div className="orb orb-cyan w-64 h-64 bottom-40 right-20 opacity-15" />
        <div className="orb orb-pink w-48 h-48 top-1/2 left-1/2 opacity-10" />
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
            Tech Stack
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Technical <span className="gradient-text">Skills</span>
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Technologies and tools I use to bring ideas to life
          </p>
        </motion.div>

        {/* Skill categories - Bento Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {skillCategories.map((category, catIndex) => {
            const colors = colorClasses[category.color as keyof typeof colorClasses];

            return (
              <motion.div
                key={category.title}
                variants={itemVariants}
                className={`card-glow p-6 ${colors.border} ${colors.glow} transition-all duration-300 group`}
              >
                {/* Header */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`w-2 h-2 rounded-full ${colors.dot}`} />
                    <h3 className={`text-lg font-semibold ${colors.icon}`}>
                      {category.title}
                    </h3>
                  </div>
                  <p className="text-text-muted text-sm">{category.description}</p>
                </div>

                {/* Skills grid */}
                <div className="grid grid-cols-2 gap-3">
                  {category.skills.map((skill, skillIndex) => {
                    const Icon = skill.icon;
                    return (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.3,
                          delay: 0.2 + catIndex * 0.1 + skillIndex * 0.05,
                        }}
                        whileHover={{ scale: 1.05, y: -2 }}
                        className={`flex flex-col items-center gap-2 p-4 rounded-xl bg-surface/40 border border-border/20 ${colors.border} transition-all duration-300 cursor-default`}
                      >
                        <Icon
                          size={28}
                          className={`${colors.icon} transition-transform group-hover:scale-110`}
                        />
                        <span className="text-text-secondary text-xs text-center font-medium">
                          {skill.name}
                        </span>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Additional skills */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 mb-6">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-accent-purple/50" />
            <p className="text-text-muted text-sm uppercase tracking-[0.2em]">
              Also experienced with
            </p>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-accent-cyan/50" />
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto"
          >
            {additionalSkills.map((skill, index) => (
              <motion.span
                key={skill}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.03,
                }}
                whileHover={{
                  scale: 1.05,
                  y: -2,
                }}
                className="tech-pill cursor-default"
              >
                {skill}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
