"use client";

import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaSearch,
  FaTimes,
  FaHome,
  FaUser,
  FaBriefcase,
  FaCode,
  FaCogs,
  FaEnvelope,
  FaSun,
  FaMoon,
  FaDownload,
  FaGamepad,
  FaGithub,
  FaLinkedin,
  FaExternalLinkAlt,
  FaBrain,
  FaRobot,
  FaDatabase,
  FaChrome,
} from "react-icons/fa";

interface CommandItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  category: "navigation" | "actions" | "projects" | "socials";
  action: () => void;
  keywords?: string[];
}

interface CommandPaletteProps {
  onToggleTheme: () => void;
  isDarkMode: boolean;
  onOpenGames: () => void;
  onCopyEmail: () => void;
}

export default function CommandPalette({
  onToggleTheme,
  isDarkMode,
  onOpenGames,
  onCopyEmail,
}: CommandPaletteProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const commands: CommandItem[] = useMemo(
    () => [
      // Navigation
      {
        id: "nav-home",
        label: "Go to Home",
        icon: <FaHome size={16} />,
        category: "navigation",
        action: () => {
          window.scrollTo({ top: 0, behavior: "smooth" });
          setIsOpen(false);
        },
        keywords: ["top", "start"],
      },
      {
        id: "nav-about",
        label: "Go to About",
        icon: <FaUser size={16} />,
        category: "navigation",
        action: () => {
          document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
          setIsOpen(false);
        },
        keywords: ["me", "bio"],
      },
      {
        id: "nav-experience",
        label: "Go to Experience",
        icon: <FaBriefcase size={16} />,
        category: "navigation",
        action: () => {
          document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" });
          setIsOpen(false);
        },
        keywords: ["work", "jobs", "career"],
      },
      {
        id: "nav-projects",
        label: "Go to Projects",
        icon: <FaCode size={16} />,
        category: "navigation",
        action: () => {
          document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
          setIsOpen(false);
        },
        keywords: ["portfolio", "work"],
      },
      {
        id: "nav-skills",
        label: "Go to Skills",
        icon: <FaCogs size={16} />,
        category: "navigation",
        action: () => {
          document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" });
          setIsOpen(false);
        },
        keywords: ["tech", "technologies"],
      },
      {
        id: "nav-contact",
        label: "Go to Contact",
        icon: <FaEnvelope size={16} />,
        category: "navigation",
        action: () => {
          document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
          setIsOpen(false);
        },
        keywords: ["email", "message"],
      },

      // Actions
      {
        id: "action-theme",
        label: isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode",
        icon: isDarkMode ? <FaSun size={16} /> : <FaMoon size={16} />,
        category: "actions",
        action: () => {
          onToggleTheme();
          setIsOpen(false);
        },
        keywords: ["dark", "light", "theme", "mode"],
      },
      {
        id: "action-resume",
        label: "Download Resume",
        icon: <FaDownload size={16} />,
        category: "actions",
        action: () => {
          const link = document.createElement("a");
          link.href = "/resume.pdf";
          link.download = "resume.pdf";
          link.click();
          setIsOpen(false);
        },
        keywords: ["cv", "pdf"],
      },
      {
        id: "action-email",
        label: "Copy Email Address",
        icon: <FaEnvelope size={16} />,
        category: "actions",
        action: () => {
          onCopyEmail();
          setIsOpen(false);
        },
        keywords: ["contact", "mail"],
      },
      {
        id: "action-games",
        label: "Open Fun Zone",
        icon: <FaGamepad size={16} />,
        category: "actions",
        action: () => {
          onOpenGames();
          setIsOpen(false);
        },
        keywords: ["play", "snake", "memory"],
      },

      // Projects
      {
        id: "project-btc",
        label: "Biliary Tract Cancer Early Detection",
        icon: <FaBrain size={16} />,
        category: "projects",
        action: () => {
          document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
          setIsOpen(false);
        },
        keywords: ["ml", "cancer", "xgboost"],
      },
      {
        id: "project-rag",
        label: "Financial RAG Chatbot",
        icon: <FaRobot size={16} />,
        category: "projects",
        action: () => {
          window.open("https://financialrag-chatbot.streamlit.app/", "_blank");
          setIsOpen(false);
        },
        keywords: ["llm", "ai", "chatbot"],
      },
      {
        id: "project-seance",
        label: "SeanceAI",
        icon: <FaBrain size={16} />,
        category: "projects",
        action: () => {
          window.open("https://seance-ai.up.railway.app", "_blank");
          setIsOpen(false);
        },
        keywords: ["history", "conversation"],
      },
      {
        id: "project-agri",
        label: "Agricultural Standardization & Risk Detection",
        icon: <FaDatabase size={16} />,
        category: "projects",
        action: () => {
          document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
          setIsOpen(false);
        },
        keywords: ["rag", "gpt"],
      },
      {
        id: "project-video",
        label: "Video Speed Controller",
        icon: <FaChrome size={16} />,
        category: "projects",
        action: () => {
          window.open("https://github.com/ARJUNVARMA2000/Video-Speed-Controller-extension", "_blank");
          setIsOpen(false);
        },
        keywords: ["chrome", "extension"],
      },

      // Socials
      {
        id: "social-github",
        label: "Open GitHub",
        icon: <FaGithub size={16} />,
        category: "socials",
        action: () => {
          window.open("https://github.com/ARJUNVARMA2000", "_blank");
          setIsOpen(false);
        },
        keywords: ["code", "repo"],
      },
      {
        id: "social-linkedin",
        label: "Open LinkedIn",
        icon: <FaLinkedin size={16} />,
        category: "socials",
        action: () => {
          window.open("https://www.linkedin.com/in/varma-arjun/", "_blank");
          setIsOpen(false);
        },
        keywords: ["profile", "connect"],
      },
    ],
    [isDarkMode, onToggleTheme, onOpenGames, onCopyEmail]
  );

  const filteredCommands = useMemo(() => {
    if (!search.trim()) return commands;

    const searchLower = search.toLowerCase();
    return commands.filter((cmd) => {
      const labelMatch = cmd.label.toLowerCase().includes(searchLower);
      const keywordMatch = cmd.keywords?.some((k) => k.toLowerCase().includes(searchLower));
      return labelMatch || keywordMatch;
    });
  }, [search, commands]);

  const groupedCommands = useMemo(() => {
    const groups: Record<string, CommandItem[]> = {
      navigation: [],
      actions: [],
      projects: [],
      socials: [],
    };

    filteredCommands.forEach((cmd) => {
      groups[cmd.category].push(cmd);
    });

    return groups;
  }, [filteredCommands]);

  // Keyboard shortcut to open
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setSearch("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Reset selection when search changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [search]);

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => Math.min(prev + 1, filteredCommands.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => Math.max(prev - 1, 0));
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (filteredCommands[selectedIndex]) {
          filteredCommands[selectedIndex].action();
        }
      }
    },
    [filteredCommands, selectedIndex]
  );

  // Scroll selected item into view
  useEffect(() => {
    const selectedEl = listRef.current?.querySelector(`[data-index="${selectedIndex}"]`);
    selectedEl?.scrollIntoView({ block: "nearest" });
  }, [selectedIndex]);

  const categoryLabels: Record<string, string> = {
    navigation: "Navigation",
    actions: "Actions",
    projects: "Projects",
    socials: "Socials",
  };

  let flatIndex = -1;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[80] flex items-start justify-center pt-[15vh] px-4 bg-black/50 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.15 }}
            className="w-full max-w-lg bg-bg border border-border rounded-xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
            onKeyDown={handleKeyDown}
          >
            {/* Search input */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
              <FaSearch className="text-text-muted" size={16} />
              <input
                ref={inputRef}
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search commands..."
                className="flex-1 bg-transparent text-text outline-none placeholder:text-text-muted"
              />
              <kbd className="px-2 py-1 text-xs text-text-muted bg-surface rounded border border-border">
                ESC
              </kbd>
            </div>

            {/* Results */}
            <div ref={listRef} className="max-h-[50vh] overflow-y-auto p-2">
              {filteredCommands.length === 0 ? (
                <p className="text-text-muted text-center py-8">No commands found</p>
              ) : (
                Object.entries(groupedCommands).map(([category, items]) => {
                  if (items.length === 0) return null;

                  return (
                    <div key={category} className="mb-2">
                      <p className="px-2 py-1 text-xs font-medium text-text-muted uppercase tracking-wider">
                        {categoryLabels[category]}
                      </p>
                      {items.map((cmd) => {
                        flatIndex++;
                        const isSelected = selectedIndex === flatIndex;
                        const currentIndex = flatIndex;

                        return (
                          <button
                            key={cmd.id}
                            data-index={currentIndex}
                            onClick={cmd.action}
                            onMouseEnter={() => setSelectedIndex(currentIndex)}
                            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                              isSelected
                                ? "bg-accent/10 text-accent"
                                : "text-text-secondary hover:bg-surface"
                            }`}
                          >
                            <span className={isSelected ? "text-accent" : "text-text-muted"}>
                              {cmd.icon}
                            </span>
                            <span className="flex-1">{cmd.label}</span>
                            {cmd.category === "socials" && (
                              <FaExternalLinkAlt size={10} className="text-text-muted" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between px-4 py-2 border-t border-border text-xs text-text-muted">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 bg-surface rounded border border-border">↑</kbd>
                  <kbd className="px-1.5 py-0.5 bg-surface rounded border border-border">↓</kbd>
                  <span className="ml-1">to navigate</span>
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 bg-surface rounded border border-border">↵</kbd>
                  <span className="ml-1">to select</span>
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
