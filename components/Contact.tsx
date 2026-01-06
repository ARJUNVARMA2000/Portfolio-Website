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

    const subject = encodeURIComponent(`Portfolio Contact from ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );

    window.location.href = `mailto:av3342@columbia.edu?subject=${subject}&body=${body}`;

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setSubmitted(false), 5000);
    }, 1000);
  };

  return (
    <section id="contact" className="section px-6">
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
            Get in <span className="gradient-text">Touch</span>
          </h2>
          <p className="text-text-secondary max-w-xl mx-auto">
            Interested in collaborating or have a question? Feel free to reach out!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-xl font-semibold mb-6">
              Contact Information
            </h3>

            {/* Info cards */}
            <div className="space-y-4 mb-8">
              <a
                href="mailto:av3342@columbia.edu"
                className="card p-4 flex items-center gap-4 group"
              >
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                  <FaEnvelope className="text-accent" size={18} />
                </div>
                <div>
                  <p className="text-text-muted text-sm">Email</p>
                  <p className="text-text group-hover:text-accent transition-colors">
                    av3342@columbia.edu
                  </p>
                </div>
              </a>

              <div className="card p-4 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent-secondary/10 flex items-center justify-center">
                  <FaPhone className="text-accent-secondary" size={18} />
                </div>
                <div>
                  <p className="text-text-muted text-sm">Phone</p>
                  <p className="text-text">(347) 987 9427</p>
                </div>
              </div>

              <div className="card p-4 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent-tertiary/10 flex items-center justify-center">
                  <FaMapMarkerAlt className="text-accent-tertiary" size={18} />
                </div>
                <div>
                  <p className="text-text-muted text-sm">Location</p>
                  <p className="text-text">New York, NY</p>
                </div>
              </div>
            </div>

            {/* Social links */}
            <p className="text-text-muted text-sm mb-4 uppercase tracking-wider">
              Connect with me
            </p>
            <div className="flex gap-3 mb-8">
              <a
                href="https://linkedin.com/in/vvarma-arjun"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl border border-border text-text-secondary hover:text-accent hover:border-accent/50 transition-all"
              >
                <FaLinkedin size={20} />
              </a>
              <a
                href="https://github.com/ARJUNVARMA2000"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl border border-border text-text-secondary hover:text-accent hover:border-accent/50 transition-all"
              >
                <FaGithub size={20} />
              </a>
              <a
                href="mailto:av3342@columbia.edu"
                className="p-3 rounded-xl border border-border text-text-secondary hover:text-accent hover:border-accent/50 transition-all"
              >
                <FaEnvelope size={20} />
              </a>
            </div>

            {/* Resume download */}
            <a
              href="/resume.pdf"
              download
              className="btn-secondary"
            >
              <FaDownload size={14} />
              Download Resume
            </a>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <form onSubmit={handleSubmit} className="card p-8">
              <h3 className="text-xl font-semibold mb-6">
                Send a Message
              </h3>

              {submitted && (
                <div className="mb-6 p-4 bg-accent-secondary/10 border border-accent-secondary/20 rounded-xl text-accent-secondary text-sm">
                  Your email client should have opened. If not, please email me directly at av3342@columbia.edu
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <label className="block text-text-secondary text-sm mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-bg border border-border rounded-xl text-text focus:border-accent focus:outline-none transition-colors"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label className="block text-text-secondary text-sm mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-bg border border-border rounded-xl text-text focus:border-accent focus:outline-none transition-colors"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block text-text-secondary text-sm mb-2">
                    Message
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-bg border border-border rounded-xl text-text focus:border-accent focus:outline-none transition-colors resize-none"
                    placeholder="Hi Arjun, I wanted to reach out about..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    "Opening Mail Client..."
                  ) : (
                    <>
                      <FaPaperPlane size={14} />
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
