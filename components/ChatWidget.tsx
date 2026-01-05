"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaRobot, FaTimes, FaPaperPlane, FaUser } from "react-icons/fa";
import { useChat } from "ai/react";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isNudgeDismissed, setIsNudgeDismissed] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: "/api/chat",
    initialMessages: [
      {
        id: "welcome",
        role: "assistant",
        content:
          "Hi! I’m Arjun’s AI assistant—ask me anything about his experience, projects, or skills.",
      },
    ],
  });

  // Show the chat nudge until user dismisses it (persisted)
  useEffect(() => {
    try {
      const dismissed = localStorage.getItem("chatNudgeDismissed");
      setIsNudgeDismissed(dismissed === "1");
    } catch {
      // Ignore (e.g., privacy mode)
      setIsNudgeDismissed(false);
    }
  }, []);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const dismissNudge = () => {
    setIsNudgeDismissed(true);
    try {
      localStorage.setItem("chatNudgeDismissed", "1");
    } catch {
      // Ignore
    }
  };

  const openChatFromNudge = () => {
    dismissNudge();
    setIsOpen(true);
  };

  return (
    <>
      {/* Mascot + CTA (only when closed) */}
      <AnimatePresence>
        {!isOpen && !isNudgeDismissed && (
          <motion.div
            key="chat-nudge"
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed bottom-6 right-24 z-50 flex items-end gap-2"
          >
            {/* Mascot */}
            <motion.div
              aria-hidden="true"
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-11 h-11 rounded-2xl bg-gradient-to-br from-cyber-cyan/30 to-cyber-magenta/25 border border-cyber-cyan/30 shadow-neon-cyan flex items-center justify-center"
            >
              <FaRobot className="text-cyber-cyan" size={18} />
              {/* Waving arm */}
              <motion.div
                className="absolute -right-2 top-2 w-4 h-4"
                style={{ transformOrigin: "15% 85%" }}
                animate={{ rotate: [0, 18, -10, 18, 0] }}
                transition={{
                  duration: 1.6,
                  repeat: Infinity,
                  repeatDelay: 1.4,
                  ease: "easeInOut",
                }}
              >
                <div className="w-4 h-[10px] rounded-full bg-cyber-cyan/40 border border-cyber-cyan/40" />
                <div className="absolute -right-[2px] -top-[1px] w-[10px] h-[10px] rounded-full bg-cyber-magenta/25 border border-cyber-magenta/40" />
              </motion.div>
              <span className="absolute -bottom-1 -left-1 w-2.5 h-2.5 bg-cyber-magenta rounded-full animate-pulse" />
            </motion.div>

            {/* Speech bubble */}
            <div className="relative pointer-events-auto">
              <button
                type="button"
                onClick={openChatFromNudge}
                className="group max-w-[16.5rem] text-left bg-cyber-black/95 border border-cyber-cyan/30 rounded-xl px-3.5 py-2.5 shadow-2xl hover:border-cyber-cyan/60 transition-colors"
                aria-label="Open chat to learn about Arjun's experiences"
              >
                <div className="text-sm text-white font-medium leading-snug">
                  Chat to learn about Arjun&apos;s experiences
                </div>
                <div className="text-xs text-gray-500 mt-0.5">
                  Ask about projects, impact, and skills.
                </div>
              </button>

              {/* Bubble tail */}
              <div
                aria-hidden="true"
                className="absolute -right-2 bottom-3 w-4 h-4 bg-cyber-black/95 border-r border-b border-cyber-cyan/30 rotate-45"
              />

              {/* Dismiss */}
              <button
                type="button"
                onClick={dismissNudge}
                className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-cyber-black border border-cyber-cyan/30 flex items-center justify-center hover:border-cyber-magenta/60 transition-colors"
                aria-label="Dismiss chat prompt"
              >
                <FaTimes className="text-gray-400" size={12} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.5, type: "spring" }}
        onClick={() => {
          if (!isOpen) dismissNudge();
          setIsOpen(!isOpen);
        }}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 ${
          isOpen
            ? "bg-cyber-magenta shadow-neon-magenta"
            : "bg-cyber-cyan shadow-neon-cyan"
        }`}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <FaTimes className="text-cyber-black" size={20} />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="relative"
            >
              <FaRobot className="text-cyber-black" size={24} />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-cyber-magenta rounded-full animate-pulse" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 z-50 w-[90vw] max-w-md h-[500px] bg-cyber-black border border-cyber-cyan/30 rounded-lg shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-cyber-cyan/10 to-cyber-magenta/10 px-4 py-3 border-b border-cyber-cyan/20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-cyber-cyan/20 flex items-center justify-center">
                  <FaRobot className="text-cyber-cyan" size={20} />
                </div>
                <div>
                  <h3 className="font-cyber text-sm text-white">
                    Ask Arjun&apos;s AI
                  </h3>
                  <p className="text-xs text-gray-500">
                    Powered by OpenRouter • GPT-5.2
                  </p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-3 ${
                    message.role === "user" ? "flex-row-reverse" : ""
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.role === "user"
                        ? "bg-cyber-magenta/20"
                        : "bg-cyber-cyan/20"
                    }`}
                  >
                    {message.role === "user" ? (
                      <FaUser
                        className="text-cyber-magenta"
                        size={14}
                      />
                    ) : (
                      <FaRobot className="text-cyber-cyan" size={14} />
                    )}
                  </div>
                  <div
                    className={`max-w-[80%] px-4 py-2 rounded-lg text-sm ${
                      message.role === "user"
                        ? "bg-cyber-magenta/20 text-white"
                        : "bg-gray-800/50 text-gray-200"
                    }`}
                  >
                    {message.content}
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-3"
                >
                  <div className="w-8 h-8 rounded-full bg-cyber-cyan/20 flex items-center justify-center">
                    <FaRobot className="text-cyber-cyan" size={14} />
                  </div>
                  <div className="bg-gray-800/50 px-4 py-3 rounded-lg">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-cyber-cyan rounded-full animate-bounce" />
                      <span
                        className="w-2 h-2 bg-cyber-cyan rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      />
                      <span
                        className="w-2 h-2 bg-cyber-cyan rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      />
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form
              onSubmit={handleSubmit}
              className="p-4 border-t border-cyber-cyan/20 bg-cyber-darker/50"
            >
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={handleInputChange}
                  placeholder="Ask about Arjun's experience..."
                  className="flex-1 px-4 py-2 bg-cyber-black border border-gray-700 rounded-lg text-white text-sm focus:border-cyber-cyan focus:outline-none transition-colors"
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="px-4 py-2 bg-cyber-cyan text-cyber-black rounded-lg hover:shadow-neon-cyan transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FaPaperPlane size={14} />
                </button>
              </div>
              <p className="text-xs text-gray-600 mt-2 text-center">
                Try: &ldquo;What ML projects has Arjun done?&rdquo;
              </p>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
