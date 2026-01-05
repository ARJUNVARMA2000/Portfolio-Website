"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaRobot, FaTimes, FaPaperPlane, FaUser } from "react-icons/fa";
import { useChat } from "ai/react";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: "/api/chat",
    initialMessages: [
      {
        id: "welcome",
        role: "assistant",
        content:
          "👋 Hey! I'm Arjun's AI assistant. Ask me anything about his experience, projects, or skills!",
      },
    ],
  });

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      {/* Chat button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.5, type: "spring" }}
        onClick={() => setIsOpen(!isOpen)}
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
