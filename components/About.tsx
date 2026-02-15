"use client";

import { motion } from "framer-motion";
import { FaGraduationCap, FaMapMarkerAlt, FaAward, FaFutbol, FaTrophy, FaCode, FaBrain } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";
import Image from "next/image";

const education = [
  {
    school: "Columbia University",
    location: "New York, NY",
    degree: "Master of Science in Data Science",
    period: "Aug 2025 - Dec 2026",
    logo: "/images/columbia-logo.jpg",
    highlights: [
      "Coursework: Applied Machine Learning, Agentic AI for Analytics, Statistical Inference and Modeling, Probability and Statistics",
      "Teaching Assistant, Columbia Business School: Business Analytics II (Foundations of AI) and Hollywood and Big Data",
    ],
    color: "purple",
  },
  {
    school: "Vellore Institute of Technology",
    location: "Vellore, India",
    degree: "B.Tech in Electronics & Communication Engineering",
    period: "Jul 2018 - May 2022",
    logo: "/images/vit-logo.png",
    highlights: [
      "Special Achiever Award | Merit Scholarship",
    ],
    color: "cyan",
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
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

export default function About() {
  return (
    <section id="about" className="section px-6 relative overflow-hidden">
      {/* Background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="orb orb-purple w-72 h-72 top-20 -right-36 opacity-20" />
        <div className="orb orb-cyan w-56 h-56 bottom-40 -left-28 opacity-20" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
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
            Get to know me
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            About <span className="gradient-text">Me</span>
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Passionate about transforming data into actionable insights
          </p>
        </motion.div>

        {/* Bento Grid Layout */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-6"
        >
          {/* Bio Card - Large */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-7 card-glow p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-gradient-to-br from-accent-purple/20 to-accent-cyan/20 border border-accent-purple/30">
                <FaBrain className="text-accent-purple" size={20} />
              </div>
              <h3 className="text-xl font-semibold">My Story</h3>
            </div>
            <p className="text-text-secondary text-lg leading-relaxed mb-6">
              Currently pursuing my Master&apos;s in Data Science at Columbia University, with 3+ years of
              prior experience at ZS Associates building ML platforms and analytics solutions for
              Fortune 500 healthcare clients. I also TA at Columbia Business School, teaching
              AI foundations and data-driven decision-making.
            </p>
            <p className="text-text-secondary text-lg leading-relaxed mb-6">
              My coursework spans Applied Machine Learning, Agentic AI for Analytics,
              Statistical Inference and Modeling, and Probability and Statistics. I&apos;m drawn
              to the areas where engineering meets real-world problem solving.
            </p>
            <p className="text-text-secondary text-lg leading-relaxed">
              I&apos;m looking for roles where I can make a genuine impact, environments that
              challenge me, push my thinking, and let me build things that matter.
            </p>
          </motion.div>

          {/* Quick Facts Card */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-5 card p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-gradient-to-br from-accent-cyan/20 to-accent-pink/20 border border-accent-cyan/30">
                <FaCode className="text-accent-cyan" size={20} />
              </div>
              <h3 className="text-xl font-semibold">Quick Facts</h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 rounded-xl bg-surface/50 border border-border/30">
                <span className="text-3xl font-bold gradient-text">3+</span>
                <span className="text-text-secondary">Years of Industry Experience</span>
              </div>
              <div className="flex items-center gap-4 p-4 rounded-xl bg-surface/50 border border-border/30">
                <span className="text-3xl font-bold gradient-text">1000+</span>
                <span className="text-text-secondary">Users Impacted</span>
              </div>
            </div>
          </motion.div>

          {/* Education Header */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-12 flex items-center gap-3 mt-4"
          >
            <div className="p-3 rounded-xl bg-gradient-to-br from-accent-purple/20 to-accent-cyan/20 border border-accent-purple/30">
              <FaGraduationCap className="text-accent-purple" size={22} />
            </div>
            <h3 className="text-2xl font-semibold">Education</h3>
          </motion.div>

          {/* Education Cards */}
          {education.map((edu, index) => (
            <motion.div
              key={edu.school}
              variants={itemVariants}
              className="lg:col-span-6 card-glow p-6 group"
            >
              <div className="flex items-start gap-4 mb-5">
                <div className="relative w-14 h-14 flex-shrink-0 rounded-xl overflow-hidden bg-white/90 p-1.5 border border-border/30 group-hover:shadow-glow-sm transition-shadow">
                  <Image
                    src={edu.logo}
                    alt={`${edu.school} logo`}
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className={`text-lg font-semibold mb-1 ${
                    edu.color === "purple" ? "text-accent-purple" : "text-accent-cyan"
                  }`}>
                    {edu.school}
                  </h4>
                  <p className="text-text-secondary flex items-center gap-2 text-sm">
                    <FaMapMarkerAlt size={12} className="text-text-muted" />
                    {edu.location}
                  </p>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-text font-medium">{edu.degree}</p>
                <p className="text-text-muted text-sm">{edu.period}</p>
              </div>

              <ul className="space-y-2.5">
                {edu.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="text-text-secondary text-sm flex items-start gap-3"
                  >
                    <FaAward className={`mt-0.5 flex-shrink-0 ${
                      edu.color === "purple" ? "text-accent-purple" : "text-accent-cyan"
                    }`} size={12} />
                    {highlight}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}

          {/* FPL Achievement Card */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-12 flex justify-center"
          >
            <a
              href="https://fantasy.premierleague.com/entry/50075/history"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-4 px-6 py-4 rounded-2xl bg-surface/50 backdrop-blur-sm border border-border/30 hover:border-accent-pink/50 hover:shadow-glow-pink transition-all duration-300 group"
            >
              <div className="p-3 rounded-xl bg-accent-pink/10 group-hover:bg-accent-pink/20 transition-colors">
                <FaFutbol className="text-accent-pink" size={18} />
              </div>
              <div>
                <span className="text-text-secondary group-hover:text-text transition-colors">
                  <FaTrophy className="inline text-yellow-500 mr-2" size={14} />
                  <span className="font-semibold text-accent-pink">Top 1%</span> FPL finishes — 4 consecutive years
                </span>
              </div>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
