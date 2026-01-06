"use client";

import { motion } from "framer-motion";
import { FaGraduationCap, FaMapMarkerAlt, FaAward } from "react-icons/fa";

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
  },
];

export default function About() {
  return (
    <section id="about" className="section px-6">
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            About <span className="gradient-text">Me</span>
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Passionate about transforming data into actionable insights
          </p>
        </motion.div>

        {/* Bio */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="card p-8 mb-12"
        >
          <p className="text-text-secondary text-lg leading-relaxed mb-4">
            I&apos;m an Advanced Data Science Associate Consultant with a passion for building
            intelligent systems that drive real business impact. Currently pursuing my
            Master&apos;s in Data Science at Columbia University, I bring 3+ years of experience
            from ZS Associates where I&apos;ve worked with Fortune 500 healthcare clients on
            ML platforms, predictive analytics, and LLM-powered solutions.
          </p>
          <p className="text-text-secondary text-lg leading-relaxed">
            I specialize in transforming complex data into actionable insights using
            Python, SQL, PySpark, and modern ML frameworks. My work spans from building
            organization-wide analytics platforms to developing early cancer detection
            models that can potentially save lives.
          </p>
        </motion.div>

        {/* Education */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2.5 rounded-xl bg-accent/10">
              <FaGraduationCap className="text-accent" size={20} />
            </div>
            <h3 className="text-xl font-semibold">Education</h3>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {education.map((edu, index) => (
            <motion.div
              key={edu.school}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              className="card p-6 group"
            >
              <h4 className="text-lg font-semibold text-accent mb-1">
                {edu.school}
              </h4>
              <p className="text-text-secondary flex items-center gap-2 text-sm mb-3">
                <FaMapMarkerAlt size={12} className="text-text-muted" />
                {edu.location}
              </p>
              <p className="text-text font-medium mb-1">{edu.degree}</p>
              <p className="text-text-muted text-sm mb-4">{edu.period}</p>
              <ul className="space-y-2">
                {edu.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="text-text-secondary text-sm flex items-start gap-2"
                  >
                    <FaAward className="text-accent-secondary mt-0.5 flex-shrink-0" size={12} />
                    {highlight}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
