"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaRobot, FaTimes, FaPaperPlane, FaUser } from "react-icons/fa";
import { useChat } from "ai/react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
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
      console.error("Chat error:", e);
    },
    initialMessages: [
      {
        id: "welcome",
        role: "assistant",
        content:
          "Hi! I'm Arjun's portfolio assistant. Ask me anything about his experience, projects, or skills.",
      },
    ],
  });

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
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-200 shadow-lg ${
          isOpen
            ? "bg-accent-secondary hover:bg-accent-secondary/90"
            : "bg-accent hover:bg-accent/90"
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
              <FaTimes className="text-on-accent" size={18} />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="relative"
            >
              <FaRobot className="text-on-accent" size={22} />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-accent-secondary rounded-full animate-pulse" />
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
            className="fixed bottom-24 right-6 z-50 w-[90vw] max-w-md h-[500px] bg-bg border border-border rounded-2xl shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="bg-surface px-5 py-4 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                  <FaRobot className="text-accent" size={18} />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-text">
                    Ask Arjun&apos;s AI
                  </h3>
                  <p className="text-xs text-text-muted">
                    Powered by OpenRouter
                  </p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {error && (
                <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm">
                  <div className="font-medium text-text">Chat unavailable</div>
                  <div className="text-xs text-text-secondary mt-1 whitespace-pre-line">
                    {error.message}
                  </div>
                  <button
                    type="button"
                    onClick={() => reload()}
                    className="mt-3 px-4 py-2 rounded-lg border border-border bg-surface text-xs hover:border-accent/50 transition-colors"
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
                    className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      message.role === "user"
                        ? "bg-accent-secondary/10"
                        : "bg-accent/10"
                    }`}
                  >
                    {message.role === "user" ? (
                      <FaUser className="text-accent-secondary" size={12} />
                    ) : (
                      <FaRobot className="text-accent" size={12} />
                    )}
                  </div>
                  <div
                    className={`max-w-[80%] px-4 py-2.5 rounded-xl text-sm ${
                      message.role === "user"
                        ? "bg-accent-secondary/10 text-text"
                        : "bg-surface text-text"
                    }`}
                  >
                    {message.role === "assistant" ? (
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                          p: ({ children }) => (
                            <p className="mb-2 last:mb-0">{children}</p>
                          ),
                          ul: ({ children }) => (
                            <ul className="list-disc pl-5 space-y-1">
                              {children}
                            </ul>
                          ),
                          ol: ({ children }) => (
                            <ol className="list-decimal pl-5 space-y-1">
                              {children}
                            </ol>
                          ),
                          li: ({ children }) => <li>{children}</li>,
                          strong: ({ children }) => (
                            <strong className="font-semibold">{children}</strong>
                          ),
                          code: ({ children }) => (
                            <code className="px-1.5 py-0.5 rounded bg-bg border border-border text-[0.85em]">
                              {children}
                            </code>
                          ),
                          pre: ({ children }) => (
                            <pre className="mt-2 rounded-lg bg-bg border border-border p-3 text-xs overflow-x-auto">
                              {children}
                            </pre>
                          ),
                          a: ({ children, href }) => (
                            <a
                              href={href}
                              target="_blank"
                              rel="noreferrer"
                              className="text-accent underline underline-offset-2"
                            >
                              {children}
                            </a>
                          ),
                        }}
                      >
                        {message.content}
                      </ReactMarkdown>
                    ) : (
                      message.content
                    )}
                  </div>
                </motion.div>
              ))}

              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-3"
                >
                  <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                    <FaRobot className="text-accent" size={12} />
                  </div>
                  <div className="bg-surface px-4 py-3 rounded-xl">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-accent rounded-full animate-bounce" />
                      <span
                        className="w-2 h-2 bg-accent rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      />
                      <span
                        className="w-2 h-2 bg-accent rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Suggested questions */}
              {messages.filter((m) => m.role === "user").length === 0 &&
                !isLoading && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="space-y-2 mt-4"
                  >
                    <p className="text-xs text-text-muted mb-2">Try asking:</p>
                    <div className="flex flex-col gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          append({
                            role: "user",
                            content: "What ML projects has Arjun worked on?",
                          })
                        }
                        className="text-left px-4 py-3 bg-surface border border-border rounded-xl text-sm text-text hover:border-accent/50 transition-colors"
                      >
                        What ML projects has Arjun worked on?
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          append({
                            role: "user",
                            content:
                              "Tell me about Arjun's experience at ZS Associates",
                          })
                        }
                        className="text-left px-4 py-3 bg-surface border border-border rounded-xl text-sm text-text hover:border-accent/50 transition-colors"
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
              className="p-4 border-t border-border bg-surface"
            >
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={handleInputChange}
                  placeholder="Ask about Arjun's experience..."
                  disabled={!!error}
                  className="flex-1 px-4 py-2.5 bg-bg border border-border rounded-xl text-text text-sm focus:border-accent focus:outline-none transition-colors disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={!!error || isLoading || !input.trim()}
                  className="px-4 py-2.5 bg-accent text-on-accent rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:bg-accent/90"
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
