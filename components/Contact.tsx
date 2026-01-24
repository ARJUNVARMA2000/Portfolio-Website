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
  FaCopy,
  FaCheck,
} from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";
import { useToast } from "./ToastContext";

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

export default function Contact() {
  const { addToast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("av3342@columbia.edu");
    setCopied(true);
    addToast("Email copied to clipboard!", "success");
    setTimeout(() => setCopied(false), 2000);
  };

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
    <section id="contact" className="section px-6 relative overflow-hidden">
      {/* Background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="orb orb-purple w-96 h-96 -bottom-48 -left-48 opacity-20" />
        <div className="orb orb-cyan w-72 h-72 top-20 right-10 opacity-15" />
        <div className="orb orb-pink w-56 h-56 bottom-1/4 right-1/4 opacity-10" />
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
            Let&apos;s Connect
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Get in <span className="gradient-text">Touch</span>
          </h2>
          <p className="text-text-secondary text-lg max-w-xl mx-auto">
            Interested in collaborating or have a question? Feel free to reach out!
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid lg:grid-cols-5 gap-8"
        >
          {/* Contact Info - Left side */}
          <motion.div variants={itemVariants} className="lg:col-span-2 space-y-6">
            <h3 className="text-2xl font-semibold mb-6">
              Contact Information
            </h3>

            {/* Info cards */}
            <div className="space-y-4">
              {/* Email */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="card-glow p-5 flex items-center gap-4 group cursor-pointer"
                onClick={handleCopyEmail}
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-purple/20 to-accent-cyan/20 border border-accent-purple/30 flex items-center justify-center group-hover:shadow-glow-sm transition-shadow">
                  <FaEnvelope className="text-accent-purple" size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-text-muted text-sm">Email</p>
                  <p className="text-text group-hover:text-accent-cyan transition-colors truncate">
                    av3342@columbia.edu
                  </p>
                </div>
                <button className="p-2.5 rounded-xl text-text-muted hover:text-accent-cyan hover:bg-accent-cyan/10 transition-all">
                  {copied ? <FaCheck size={16} className="text-accent-green" /> : <FaCopy size={16} />}
                </button>
              </motion.div>

              {/* Phone */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="card p-5 flex items-center gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-cyan/20 to-accent-pink/20 border border-accent-cyan/30 flex items-center justify-center">
                  <FaPhone className="text-accent-cyan" size={18} />
                </div>
                <div>
                  <p className="text-text-muted text-sm">Phone</p>
                  <p className="text-text">(347) 987 9427</p>
                </div>
              </motion.div>

              {/* Location */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="card p-5 flex items-center gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-pink/20 to-accent-purple/20 border border-accent-pink/30 flex items-center justify-center">
                  <FaMapMarkerAlt className="text-accent-pink" size={18} />
                </div>
                <div>
                  <p className="text-text-muted text-sm">Location</p>
                  <p className="text-text">New York, NY</p>
                </div>
              </motion.div>
            </div>

            {/* Social links */}
            <div className="pt-4">
              <p className="text-text-muted text-sm mb-4 uppercase tracking-[0.2em]">
                Connect with me
              </p>
              <div className="flex gap-3">
                <motion.a
                  whileHover={{ scale: 1.05, y: -2 }}
                  href="https://www.linkedin.com/in/varma-arjun/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-xl bg-surface/50 border border-border/30 text-text-secondary hover:text-accent-purple hover:border-accent-purple/50 hover:shadow-glow transition-all duration-300"
                >
                  <FaLinkedin size={22} />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.05, y: -2 }}
                  href="https://github.com/ARJUNVARMA2000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-xl bg-surface/50 border border-border/30 text-text-secondary hover:text-accent-cyan hover:border-accent-cyan/50 hover:shadow-glow-cyan transition-all duration-300"
                >
                  <FaGithub size={22} />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.05, y: -2 }}
                  href="mailto:av3342@columbia.edu"
                  className="p-4 rounded-xl bg-surface/50 border border-border/30 text-text-secondary hover:text-accent-pink hover:border-accent-pink/50 hover:shadow-glow-pink transition-all duration-300"
                >
                  <FaEnvelope size={22} />
                </motion.a>
              </div>
            </div>

            {/* Resume download */}
            <motion.a
              whileHover={{ scale: 1.02 }}
              href="/resume.pdf"
              download
              className="btn-secondary w-full justify-center mt-6"
            >
              <FaDownload size={14} />
              Download Resume
            </motion.a>
          </motion.div>

          {/* Contact Form - Right side */}
          <motion.div variants={itemVariants} className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="card-glow p-8">
              <h3 className="text-2xl font-semibold mb-6">
                Send a Message
              </h3>

              {submitted && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-accent-green/10 border border-accent-green/30 rounded-xl text-accent-green text-sm"
                >
                  Your email client should have opened. If not, please email me directly at av3342@columbia.edu
                </motion.div>
              )}

              <div className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-text-secondary text-sm mb-2 font-medium">
                      Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full px-4 py-3.5 bg-surface/50 border border-border/50 rounded-xl text-text placeholder:text-text-muted focus:border-accent-purple transition-all duration-300"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label className="block text-text-secondary text-sm mb-2 font-medium">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full px-4 py-3.5 bg-surface/50 border border-border/50 rounded-xl text-text placeholder:text-text-muted focus:border-accent-purple transition-all duration-300"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-text-secondary text-sm mb-2 font-medium">
                    Message
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="w-full px-4 py-3.5 bg-surface/50 border border-border/50 rounded-xl text-text placeholder:text-text-muted focus:border-accent-purple transition-all duration-300 resize-none"
                    placeholder="I'd like to discuss..."
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                      />
                      Opening Mail Client...
                    </span>
                  ) : (
                    <>
                      <FaPaperPlane size={14} />
                      <span>Send Message</span>
                    </>
                  )}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
