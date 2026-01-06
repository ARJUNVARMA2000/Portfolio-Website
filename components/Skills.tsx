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

const skillCategories = [
  {
    title: "Programming",
    color: "accent",
    skills: [
      { name: "Python", icon: FaPython },
      { name: "SQL", icon: TbSql },
      { name: "C++", icon: TbBrandCpp },
      { name: "R", icon: FaRProject },
    ],
  },
  {
    title: "Analytics & ML",
    color: "accent-secondary",
    skills: [
      { name: "PyTorch", icon: SiPytorch },
      { name: "Scikit-learn", icon: SiScikitlearn },
      { name: "Pandas", icon: SiPandas },
      { name: "NumPy", icon: SiNumpy },
    ],
  },
  {
    title: "Big Data & MLOps",
    color: "accent-tertiary",
    skills: [
      { name: "PySpark", icon: SiApachespark },
      { name: "Databricks", icon: SiDatabricks },
      { name: "MLflow", icon: SiMlflow },
      { name: "AWS", icon: FaAws },
    ],
  },
  {
    title: "Tools & Platforms",
    color: "accent",
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
    <section id="skills" className="section section-alt px-6">
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
            Technical <span className="gradient-text">Skills</span>
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Technologies and tools I use to bring ideas to life
          </p>
        </motion.div>

        {/* Skill categories */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {skillCategories.map((category, catIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: catIndex * 0.1 }}
              className="card p-6"
            >
              <h3
                className={`text-sm font-semibold mb-5 text-center ${
                  category.color === "accent"
                    ? "text-accent"
                    : category.color === "accent-secondary"
                    ? "text-accent-secondary"
                    : "text-accent-tertiary"
                }`}
              >
                {category.title}
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {category.skills.map((skill) => {
                  const Icon = skill.icon;
                  return (
                    <motion.div
                      key={skill.name}
                      whileHover={{ scale: 1.02 }}
                      className={`flex flex-col items-center gap-2 p-3 rounded-xl border border-border hover:border-opacity-50 transition-all duration-200 ${
                        category.color === "accent"
                          ? "hover:border-accent/50 hover:bg-accent/5"
                          : category.color === "accent-secondary"
                          ? "hover:border-accent-secondary/50 hover:bg-accent-secondary/5"
                          : "hover:border-accent-tertiary/50 hover:bg-accent-tertiary/5"
                      }`}
                    >
                      <Icon
                        size={24}
                        className={
                          category.color === "accent"
                            ? "text-accent"
                            : category.color === "accent-secondary"
                            ? "text-accent-secondary"
                            : "text-accent-tertiary"
                        }
                      />
                      <span className="text-text-secondary text-xs text-center">
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
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center"
        >
          <p className="text-text-muted text-sm mb-4 uppercase tracking-wider">
            Also experienced with
          </p>
          <div className="flex flex-wrap justify-center gap-2 max-w-4xl mx-auto">
            {additionalSkills.map((skill, index) => (
              <motion.span
                key={skill}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.2, delay: 0.5 + index * 0.02 }}
                className="tech-pill"
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
