"use client";

import { motion } from "framer-motion";
import {
  FaPython,
  FaDatabase,
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

const skillCategories = [
  {
    title: "Programming",
    color: "cyan",
    skills: [
      { name: "Python", icon: FaPython },
      { name: "SQL", icon: TbSql },
      { name: "C++", icon: TbBrandCpp },
      { name: "R", icon: FaRProject },
    ],
  },
  {
    title: "Analytics & ML",
    color: "magenta",
    skills: [
      { name: "PyTorch", icon: SiPytorch },
      { name: "Scikit-learn", icon: SiScikitlearn },
      { name: "Pandas", icon: SiPandas },
      { name: "NumPy", icon: SiNumpy },
    ],
  },
  {
    title: "Big Data & MLOps",
    color: "yellow",
    skills: [
      { name: "PySpark", icon: SiApachespark },
      { name: "Databricks", icon: SiDatabricks },
      { name: "MLflow", icon: SiMlflow },
      { name: "AWS", icon: FaAws },
    ],
  },
  {
    title: "Tools & Platforms",
    color: "cyan",
    skills: [
      { name: "Git", icon: FaGitAlt },
      { name: "Jupyter", icon: SiJupyter },
      { name: "Streamlit", icon: SiStreamlit },
      { name: "Docker", icon: FaDocker },
    ],
  },
];

const additionalSkills = [
  "Deep Learning",
  "Data Engineering",
  "ETL Pipelines",
  "SHAP",
  "BeautifulSoup",
  "matplotlib",
  "S3",
  "EMR",
  "Athena",
  "SageMaker",
  "Jira",
  "Confluence",
  "LangChain",
  "ChromaDB",
  "RAG",
  "LLMs",
];

export default function Skills() {
  return (
    <section id="skills" className="py-20 px-4 relative bg-t-bg2/60">
      <div className="absolute inset-0 grid-bg opacity-20" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-cyber text-3xl md:text-4xl font-bold text-t-text mb-4">
            <span className="text-t-accent">&lt;</span> Skills{" "}
            <span className="text-t-accent">/&gt;</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-t-accent to-t-accent2 mx-auto" />
        </motion.div>

        {/* Skill categories */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {skillCategories.map((category, catIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: catIndex * 0.1 }}
              className="cyber-card p-6 rounded-lg"
            >
              <h3
                className={`font-cyber text-lg font-bold mb-4 text-center ${
                  category.color === "cyan"
                    ? "text-t-accent"
                    : category.color === "magenta"
                    ? "text-t-accent2"
                    : "text-t-accent3"
                }`}
              >
                {category.title}
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {category.skills.map((skill, skillIndex) => {
                  const Icon = skill.icon;
                  return (
                    <motion.div
                      key={skill.name}
                      whileHover={{ scale: 1.05 }}
                      className={`flex flex-col items-center gap-2 p-3 rounded-lg border transition-all duration-300 ${
                        category.color === "cyan"
                          ? "border-t-border hover:border-t-accent hover:shadow-sm"
                          : category.color === "magenta"
                          ? "border-t-border hover:border-t-accent2 hover:shadow-sm"
                          : "border-t-border hover:border-t-accent3 hover:shadow-sm"
                      }`}
                    >
                      <Icon
                        size={28}
                        className={
                          category.color === "cyan"
                            ? "text-t-accent"
                            : category.color === "magenta"
                            ? "text-t-accent2"
                            : "text-t-accent3"
                        }
                      />
                      <span className="text-t-muted text-xs text-center">
                        {skill.name}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional skills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <h3 className="font-mono text-sm text-t-muted2 mb-4 uppercase tracking-wider">
            Also experienced with
          </h3>
          <div className="flex flex-wrap justify-center gap-2 max-w-4xl mx-auto">
            {additionalSkills.map((skill, index) => (
              <motion.span
                key={skill}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.5 + index * 0.02 }}
                className="px-3 py-1 text-sm border border-t-border text-t-muted rounded-full hover:border-t-accent hover:text-t-accent transition-colors"
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
