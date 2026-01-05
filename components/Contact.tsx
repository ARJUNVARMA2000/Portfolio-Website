"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import {
  FaEnvelope,
  FaLinkedin,
  FaGithub,
  FaPaperPlane,
  FaMapMarkerAlt,
  FaPhone,
  FaDownload,
} from "react-icons/fa";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Create mailto link with form data
    const subject = encodeURIComponent(`Portfolio Contact from ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );
    
    // Open mail client
    window.location.href = `mailto:av3342@columbia.edu?subject=${subject}&body=${body}`;
    
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setSubmitted(false), 5000);
    }, 1000);
  };

  return (
    <section id="contact" className="py-20 px-4 relative">
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
            <span className="text-cyber-cyan">&lt;</span> Contact{" "}
            <span className="text-cyber-cyan">/&gt;</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyber-cyan to-cyber-magenta mx-auto mb-4" />
          <p className="text-gray-400 max-w-xl mx-auto">
            Interested in collaborating or have a question? Feel free to reach out!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="font-cyber text-xl text-cyber-cyan mb-6">
              Get in Touch
            </h3>

            {/* Info cards */}
            <div className="space-y-4 mb-8">
              <a
                href="mailto:av3342@columbia.edu"
                className="cyber-card p-4 rounded-lg flex items-center gap-4 group"
              >
                <div className="w-12 h-12 rounded-lg bg-cyber-cyan/10 flex items-center justify-center group-hover:bg-cyber-cyan/20 transition-colors">
                  <FaEnvelope className="text-cyber-cyan" size={20} />
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Email</p>
                  <p className="text-white group-hover:text-cyber-cyan transition-colors">
                    av3342@columbia.edu
                  </p>
                </div>
              </a>

              <div className="cyber-card p-4 rounded-lg flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-cyber-magenta/10 flex items-center justify-center">
                  <FaPhone className="text-cyber-magenta" size={20} />
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Phone</p>
                  <p className="text-white">(347) 987 9427</p>
                </div>
              </div>

              <div className="cyber-card p-4 rounded-lg flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-cyber-yellow/10 flex items-center justify-center">
                  <FaMapMarkerAlt className="text-cyber-yellow" size={20} />
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Location</p>
                  <p className="text-white">New York, NY</p>
                </div>
              </div>
            </div>

            {/* Social links */}
            <h4 className="font-mono text-sm text-gray-500 mb-4 uppercase tracking-wider">
              Connect with me
            </h4>
            <div className="flex gap-4 mb-8">
              <a
                href="https://linkedin.com/in/vvarma-arjun"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-lg border border-cyber-cyan/30 flex items-center justify-center text-gray-400 hover:text-cyber-cyan hover:border-cyber-cyan hover:shadow-glow-sm transition-all"
              >
                <FaLinkedin size={24} />
              </a>
              <a
                href="https://github.com/ARJUNVARMA2000"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-lg border border-cyber-cyan/30 flex items-center justify-center text-gray-400 hover:text-cyber-cyan hover:border-cyber-cyan hover:shadow-glow-sm transition-all"
              >
                <FaGithub size={24} />
              </a>
              <a
                href="mailto:av3342@columbia.edu"
                className="w-12 h-12 rounded-lg border border-cyber-cyan/30 flex items-center justify-center text-gray-400 hover:text-cyber-cyan hover:border-cyber-cyan hover:shadow-glow-sm transition-all"
              >
                <FaEnvelope size={24} />
              </a>
            </div>

            {/* Resume download */}
            <a
              href="/resume.pdf"
              download
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-cyber-magenta text-cyber-magenta rounded-lg hover:bg-cyber-magenta hover:text-cyber-black transition-all duration-300 hover:shadow-neon-magenta"
            >
              <FaDownload size={16} />
              Download Resume
            </a>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="cyber-card p-6 md:p-8 rounded-lg">
              <h3 className="font-cyber text-xl text-cyber-magenta mb-6">
                Send a Message
              </h3>

              {submitted && (
                <div className="mb-6 p-4 bg-green-900/20 border border-green-500/30 rounded-lg text-green-400 text-sm">
                  Your email client should have opened. If not, please email me directly at av3342@columbia.edu
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <label className="block text-gray-400 text-sm mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-cyber-black/50 border border-gray-700 rounded-lg text-white focus:border-cyber-cyan focus:outline-none focus:shadow-glow-sm transition-all"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label className="block text-gray-400 text-sm mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-cyber-black/50 border border-gray-700 rounded-lg text-white focus:border-cyber-cyan focus:outline-none focus:shadow-glow-sm transition-all"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block text-gray-400 text-sm mb-2">
                    Message
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-cyber-black/50 border border-gray-700 rounded-lg text-white focus:border-cyber-cyan focus:outline-none focus:shadow-glow-sm transition-all resize-none"
                    placeholder="Hi Arjun, I wanted to reach out about..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full cyber-btn flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <span className="animate-spin">⚡</span>
                      Opening Mail Client...
                    </>
                  ) : (
                    <>
                      <FaPaperPlane />
                      Send Message
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
