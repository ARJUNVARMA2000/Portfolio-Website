"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaRobot, FaTimes, FaPaperPlane, FaUser } from "react-icons/fa";
import { useChat } from "ai/react";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isNudgeDismissed, setIsNudgeDismissed] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    append,
    error,
    reload,
  } = useChat({
    api: "/api/chat",
    keepLastMessageOnError: true,
    onResponse: async (res) => {
      if (res.ok) return;
      try {
        const data = (await res.json()) as { error?: string; hint?: string };
        const msg = [data?.error, data?.hint].filter(Boolean).join("\n");
        throw new Error(msg || `Request failed (${res.status})`);
      } catch {
        throw new Error(`Request failed (${res.status})`);
      }
    },
    onError: (e) => {
      // eslint-disable-next-line no-console
      console.error("Chat error:", e);
    },
    initialMessages: [
      {
        id: "welcome",
        role: "assistant",
        content:
          "Hi! I'm Arjun's AI assistant—ask me anything about his experience, projects, or skills.",
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
              className="relative w-11 h-11 rounded-2xl bg-gradient-to-br from-t-accent/12 to-t-accent2/10 border border-t-border shadow-sm flex items-center justify-center"
            >
              <FaRobot className="text-t-accent" size={18} />
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
                <div className="w-4 h-[10px] rounded-full bg-t-accent/20 border border-t-border" />
                <div className="absolute -right-[2px] -top-[1px] w-[10px] h-[10px] rounded-full bg-t-accent2/15 border border-t-border" />
              </motion.div>
              <span className="absolute -bottom-1 -left-1 w-2.5 h-2.5 bg-t-accent2 rounded-full animate-pulse" />
            </motion.div>

            {/* Speech bubble */}
            <div className="relative pointer-events-auto">
              <button
                type="button"
                onClick={openChatFromNudge}
                className="group max-w-[16.5rem] text-left bg-t-bg/95 border border-t-border rounded-xl px-3.5 py-2.5 shadow-2xl hover:border-t-accent/60 transition-colors"
                aria-label="Open chat to learn about Arjun's experiences"
              >
                <div className="text-sm text-t-text font-medium leading-snug">
                  Chat to learn about Arjun&apos;s experiences
                </div>
                <div className="text-xs text-gray-500 mt-0.5">
                  Ask about projects, impact, and skills.
                </div>
              </button>

              {/* Bubble tail */}
              <div
                aria-hidden="true"
                className="absolute -right-2 bottom-3 w-4 h-4 bg-t-bg/95 border-r border-b border-t-border rotate-45"
              />

              {/* Dismiss */}
              <button
                type="button"
                onClick={dismissNudge}
                className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-t-bg border border-t-border flex items-center justify-center hover:border-t-accent2/60 transition-colors"
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
            ? "bg-t-accent2 shadow-md"
            : "bg-t-accent shadow-md"
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
              <FaTimes className="text-t-onAccent" size={20} />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="relative"
            >
              <FaRobot className="text-t-onAccent" size={24} />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-t-accent2 rounded-full animate-pulse" />
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
            className="fixed bottom-24 right-6 z-50 w-[90vw] max-w-md h-[500px] bg-t-bg border border-t-border rounded-lg shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-t-accent/10 to-t-accent2/10 px-4 py-3 border-b border-t-border">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-t-accent/10 flex items-center justify-center">
                  <FaRobot className="text-t-accent" size={20} />
                </div>
                <div>
                  <h3 className="font-cyber text-sm text-t-text">
                    Ask Arjun&apos;s AI
                  </h3>
                  <p className="text-xs text-gray-500">
                    Powered by OpenRouter
                  </p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {error && (
                <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-t-text">
                  <div className="font-medium">Chat is unavailable right now.</div>
                  <div className="text-xs text-t-muted mt-1 whitespace-pre-line">
                    {error.message}
                  </div>
                  <button
                    type="button"
                    onClick={() => reload()}
                    className="mt-2 inline-flex items-center gap-2 rounded-md border border-t-border bg-t-bg px-3 py-1.5 text-xs hover:border-t-accent/60 transition-colors"
                  >
                    Retry
                  </button>
                </div>
              )}
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
                        ? "bg-t-accent2/10"
                        : "bg-t-accent/10"
                    }`}
                  >
                    {message.role === "user" ? (
                      <FaUser
                        className="text-t-accent2"
                        size={14}
                      />
                    ) : (
                      <FaRobot className="text-t-accent" size={14} />
                    )}
                  </div>
                  <div
                    className={`max-w-[80%] px-4 py-2 rounded-lg text-sm ${
                      message.role === "user"
                        ? "bg-t-accent2/15 text-t-text"
                        : "bg-t-bg2/70 text-t-text"
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
                  <div className="w-8 h-8 rounded-full bg-t-accent/10 flex items-center justify-center">
                    <FaRobot className="text-t-accent" size={14} />
                  </div>
                  <div className="bg-t-bg2/70 px-4 py-3 rounded-lg">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-t-accent rounded-full animate-bounce" />
                      <span
                        className="w-2 h-2 bg-t-accent rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      />
                      <span
                        className="w-2 h-2 bg-t-accent rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      />
                    </div>
                  </div>
                </motion.div>
              )}
              
              {/* Suggested Questions - Show only when no user messages exist */}
              {messages.filter(m => m.role === "user").length === 0 && !isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="space-y-2 mt-4"
                >
                  <p className="text-xs text-gray-500 mb-2">Try asking:</p>
                  <div className="flex flex-col gap-2">
                    <button
                      type="button"
                      onClick={() => append({ role: "user", content: "What ML projects has Arjun worked on?" })}
                      className="text-left px-4 py-2.5 bg-t-surface border border-t-border rounded-lg text-sm text-t-text hover:border-t-accent hover:bg-t-accent/5 transition-all duration-200"
                    >
                      What ML projects has Arjun worked on?
                    </button>
                    <button
                      type="button"
                      onClick={() => append({ role: "user", content: "Tell me about Arjun's experience at ZS Associates" })}
                      className="text-left px-4 py-2.5 bg-t-surface border border-t-border rounded-lg text-sm text-t-text hover:border-t-accent hover:bg-t-accent/5 transition-all duration-200"
                    >
                      Tell me about Arjun&apos;s experience at ZS Associates
                    </button>
                  </div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form
              onSubmit={handleSubmit}
              className="p-4 border-t border-t-border bg-t-bg2/60"
            >
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={handleInputChange}
                  placeholder="Ask about Arjun's experience..."
                  disabled={!!error}
                  className="flex-1 px-4 py-2 bg-t-surface border border-t-border rounded-lg text-t-text text-sm focus:border-t-accent focus:outline-none transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                />
                <button
                  type="submit"
                  disabled={!!error || isLoading || !input.trim()}
                  className="px-4 py-2 bg-t-accent text-t-onAccent rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FaPaperPlane size={14} />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
