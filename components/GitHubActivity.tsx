"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaCodeBranch, FaStar, FaExternalLinkAlt } from "react-icons/fa";

interface GitHubEvent {
  id: string;
  type: string;
  repo: {
    name: string;
    url: string;
  };
  created_at: string;
  payload?: {
    commits?: Array<{ message: string }>;
    ref?: string;
    action?: string;
  };
}

interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  language: string | null;
  updated_at: string;
}

const GITHUB_USERNAME = "ARJUNVARMA2000";

export default function GitHubActivity() {
  const [events, setEvents] = useState<GitHubEvent[]>([]);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchGitHubData() {
      try {
        const [eventsRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${GITHUB_USERNAME}/events/public?per_page=5`),
          fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=4`),
        ]);

        if (eventsRes.ok) {
          const eventsData = await eventsRes.json();
          setEvents(eventsData);
        }

        if (reposRes.ok) {
          const reposData = await reposRes.json();
          setRepos(reposData);
        }
      } catch (err) {
        console.error("Failed to fetch GitHub data:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchGitHubData();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
  };

  const getEventDescription = (event: GitHubEvent) => {
    const repoName = event.repo.name.split("/")[1];
    switch (event.type) {
      case "PushEvent":
        const commitCount = event.payload?.commits?.length || 0;
        return `Pushed ${commitCount} commit${commitCount > 1 ? "s" : ""} to ${repoName}`;
      case "CreateEvent":
        return `Created ${event.payload?.ref || "repository"} in ${repoName}`;
      case "WatchEvent":
        return `Starred ${repoName}`;
      case "ForkEvent":
        return `Forked ${repoName}`;
      case "PullRequestEvent":
        return `${event.payload?.action} PR in ${repoName}`;
      case "IssuesEvent":
        return `${event.payload?.action} issue in ${repoName}`;
      default:
        return `Activity in ${repoName}`;
    }
  };

  const languageColors: Record<string, string> = {
    Python: "bg-blue-500",
    JavaScript: "bg-yellow-500",
    TypeScript: "bg-blue-600",
    Jupyter: "bg-orange-500",
    HTML: "bg-red-500",
    CSS: "bg-purple-500",
  };

  if (error) return null;

  return (
    <section id="github" className="py-16 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-surface border border-border">
              <FaGithub size={20} className="text-text" />
            </div>
            <div>
              <h3 className="text-xl font-semibold">GitHub Activity</h3>
              <p className="text-text-muted text-sm">Recent contributions & projects</p>
            </div>
          </div>
          <a
            href={`https://github.com/${GITHUB_USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-accent hover:text-accent/80 transition-colors"
          >
            View Profile
            <FaExternalLinkAlt size={12} />
          </a>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="card p-6"
          >
            <h4 className="text-sm font-medium text-text-muted uppercase tracking-wider mb-4">
              Recent Activity
            </h4>
            {loading ? (
              <div className="space-y-3">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="animate-pulse flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-border" />
                    <div className="h-4 bg-border rounded w-3/4" />
                  </div>
                ))}
              </div>
            ) : events.length > 0 ? (
              <ul className="space-y-3">
                {events.map((event) => (
                  <li key={event.id} className="flex items-start gap-3">
                    <FaCodeBranch className="text-accent mt-1 flex-shrink-0" size={12} />
                    <div>
                      <p className="text-text-secondary text-sm">
                        {getEventDescription(event)}
                      </p>
                      <p className="text-text-muted text-xs">
                        {formatDate(event.created_at)}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-text-muted text-sm">No recent activity</p>
            )}
          </motion.div>

          {/* Top Repositories */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="card p-6"
          >
            <h4 className="text-sm font-medium text-text-muted uppercase tracking-wider mb-4">
              Repositories
            </h4>
            {loading ? (
              <div className="space-y-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="h-4 bg-border rounded w-1/2 mb-2" />
                    <div className="h-3 bg-border rounded w-3/4" />
                  </div>
                ))}
              </div>
            ) : repos.length > 0 ? (
              <ul className="space-y-4">
                {repos.map((repo) => (
                  <li key={repo.id}>
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-accent group-hover:text-accent/80 font-medium text-sm transition-colors">
                          {repo.name}
                        </span>
                        {repo.stargazers_count > 0 && (
                          <span className="flex items-center gap-1 text-text-muted text-xs">
                            <FaStar size={10} />
                            {repo.stargazers_count}
                          </span>
                        )}
                        {repo.language && (
                          <span className="flex items-center gap-1.5 text-text-muted text-xs">
                            <span
                              className={`w-2 h-2 rounded-full ${
                                languageColors[repo.language] || "bg-gray-500"
                              }`}
                            />
                            {repo.language}
                          </span>
                        )}
                      </div>
                      {repo.description && (
                        <p className="text-text-muted text-xs line-clamp-1">
                          {repo.description}
                        </p>
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-text-muted text-sm">No repositories found</p>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
