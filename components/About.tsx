"use client";

import { motion } from "framer-motion";
import { FaGraduationCap, FaMapMarkerAlt, FaMedal } from "react-icons/fa";

const education = [
  {
    school: "Columbia University",
    location: "New York, NY",
    degree: "Master of Science in Data Science",
    period: "Aug 2025 - Dec 2026",
    highlights: [
      "TA for Business Analytics II: Foundations of AI at Columbia Business School",
      "Volunteer at Columbia Disability Services",
    ],
    icon: "🗽",
  },
  {
    school: "Vellore Institute of Technology",
    location: "Vellore, India",
    degree: "B.Tech in Electronics & Communication Engineering",
    period: "Jul 2018 - May 2022",
    highlights: [
      "GPA: 4.0/4.0 (WES Evaluated)",
      "Special Achiever Award & Merit Scholarship",
    ],
    icon: "🎓",
  },
];

export default function About() {
  return (
    <section id="about" className="py-20 px-4 relative">
      {/* Background decoration */}
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
          <h2 className="font-cyber text-3xl md:text-4xl font-bold text-t-text mb-4">
            <span className="text-t-accent">&lt;</span> About Me{" "}
            <span className="text-t-accent">/&gt;</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-t-accent to-t-accent2 mx-auto" />
        </motion.div>

        {/* Bio */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="cyber-card p-6 md:p-8 rounded-lg mb-12 max-w-4xl mx-auto"
        >
          <p className="text-t-muted text-lg leading-relaxed">
            I&apos;m an Advanced Data Science Associate Consultant with a passion for building 
            intelligent systems that drive real business impact. Currently pursuing my 
            Master&apos;s in Data Science at Columbia University, I bring 3+ years of experience 
            from ZS Associates where I&apos;ve worked with Fortune 500 healthcare clients on 
            ML platforms, predictive analytics, and LLM-powered solutions.
          </p>
          <p className="text-t-muted text-lg leading-relaxed mt-4">
            I specialize in transforming complex data into actionable insights using 
            Python, SQL, PySpark, and modern ML frameworks. My work spans from building 
            organization-wide analytics platforms to developing early cancer detection 
            models that can potentially save lives.
          </p>
        </motion.div>

        {/* Education cards */}
        <motion.h3
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-cyber text-2xl text-center mb-8 text-t-text"
        >
          <FaGraduationCap className="inline-block mr-3 text-t-accent" />
          Education
        </motion.h3>

        <div className="grid md:grid-cols-2 gap-6">
          {education.map((edu, index) => (
            <motion.div
              key={edu.school}
              initial={{ opacity: 0, x: index === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              className="cyber-card p-6 rounded-lg group"
            >
              <div className="flex items-start gap-4">
                <div className="text-4xl">{edu.icon}</div>
                <div className="flex-1">
                  <h4 className="font-cyber text-xl text-t-accent group-hover:text-glow-cyan transition-all">
                    {edu.school}
                  </h4>
                  <p className="text-t-muted flex items-center gap-2 mt-1">
                    <FaMapMarkerAlt className="text-t-accent2" size={12} />
                    {edu.location}
                  </p>
                  <p className="text-t-text font-medium mt-2">{edu.degree}</p>
                  <p className="text-t-accent3 text-sm mt-1">{edu.period}</p>
                  <ul className="mt-3 space-y-1">
                    {edu.highlights.map((highlight) => (
                      <li
                        key={highlight}
                        className="text-t-muted text-sm flex items-start gap-2"
                      >
                        <FaMedal className="text-t-accent mt-1 flex-shrink-0" size={12} />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
