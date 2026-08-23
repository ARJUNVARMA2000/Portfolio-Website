"use client";

import type { CSSProperties } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import type { IndexProject, ProjectCategory } from "@/content/projects";
import { ProjectActions } from "@/components/project-actions";
import { ScrambleLabel } from "@/components/motion/scramble";

type Filter = "All" | ProjectCategory;
type Indicator = { x: number; y: number; width: number; height: number };

function searchableText(project: IndexProject) {
  return [project.title, project.year, project.category, project.oneLiner, ...project.tech]
    .join(" ")
    .toLocaleLowerCase();
}

export function ProjectExplorer({ projects }: { projects: IndexProject[] }) {
  const [enhanced, setEnhanced] = useState(false);
  const [activeFilter, setActiveFilter] = useState<Filter>("All");
  const [query, setQuery] = useState("");
  const [indicator, setIndicator] = useState<Indicator | null>(null);
  const filtersRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => setEnhanced(true), []);

  const filters = useMemo<Filter[]>(
    () => ["All", ...Array.from(new Set(projects.map((project) => project.category)))],
    [projects]
  );

  const normalizedQuery = query.trim().toLocaleLowerCase();
  const visibleProjects = useMemo(
    () =>
      !enhanced
        ? projects
        : projects.filter((project) => {
            const categoryMatch = activeFilter === "All" || project.category === activeFilter;
            const queryMatch = !normalizedQuery || searchableText(project).includes(normalizedQuery);
            return categoryMatch && queryMatch;
          }),
    [activeFilter, enhanced, normalizedQuery, projects]
  );

  useEffect(() => {
    if (!enhanced) return;
    const group = filtersRef.current;
    if (!group) return;

    const update = () => {
      const active = group.querySelector<HTMLElement>('[data-active-filter="true"]');
      if (!active) return;
      setIndicator({
        x: active.offsetLeft,
        y: active.offsetTop,
        width: active.offsetWidth,
        height: active.offsetHeight,
      });
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(group);
    return () => observer.disconnect();
  }, [activeFilter, enhanced, filters]);

  const indicatorStyle = indicator
    ? ({
        width: indicator.width,
        height: indicator.height,
        transform: `translate3d(${indicator.x}px, ${indicator.y}px, 0)`,
      } satisfies CSSProperties)
    : undefined;

  return (
    <div data-project-explorer>
      {enhanced && (
        <div className="mb-8 border border-line bg-surface p-3 sm:p-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="horizontal-scroll min-w-0 overflow-x-auto pb-1 sm:pb-0">
              <div
                ref={filtersRef}
                role="group"
                aria-label="Filter shipped projects"
                className="relative flex w-max min-w-full gap-1 border border-line bg-bg p-1 sm:min-w-0"
              >
                <span
                  aria-hidden
                  data-filter-indicator
                  style={indicatorStyle}
                  className={`pointer-events-none absolute left-0 top-0 bg-ink transition-[transform,width,height,opacity] duration-300 ease-out ${indicator ? "opacity-100" : "opacity-0"}`}
                />
                {filters.map((filter) => {
                  const active = filter === activeFilter;
                  return (
                    <button
                      key={filter}
                      type="button"
                      data-active-filter={active}
                      aria-pressed={active}
                      aria-controls="project-results"
                      onClick={() => setActiveFilter(filter)}
                      className={`relative z-10 min-h-11 whitespace-nowrap px-3 py-2 font-mono text-[10px] uppercase tracking-[0.12em] transition-colors ${active ? (indicator ? "text-bg" : "text-ink") : "text-muted hover:text-ink"}`}
                    >
                      {filter}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="relative shrink-0 sm:w-[220px]">
              <label htmlFor="project-search" className="sr-only">
                Search shipped projects
              </label>
              <input
                id="project-search"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                aria-controls="project-results"
                placeholder="Search projects"
                className="min-h-11 w-full border border-line bg-bg px-3 py-2 pr-14 font-mono text-base text-ink outline-none transition-colors placeholder:text-muted focus:border-accent sm:text-[11px]"
              />
              {query ? (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  aria-label="Clear project search"
                  className="absolute inset-y-0 right-0 inline-flex min-w-11 items-center justify-center px-2 font-mono text-[9px] uppercase tracking-[0.1em] text-muted hover:text-ink"
                >
                  clear
                </button>
              ) : null}
            </div>
          </div>
          <p role="status" aria-live="polite" aria-atomic="true" className="mt-3 font-mono text-[10px] uppercase tracking-[0.12em] text-muted">
            {visibleProjects.length} {visibleProjects.length === 1 ? "project" : "projects"}
          </p>
        </div>
      )}

      <ul id="project-results" aria-label="Shipped projects">
        {visibleProjects.map((project) => (
          <li
            key={project.title}
            data-row
            className="group grid grid-cols-1 gap-x-8 gap-y-2 border-t border-line py-5 last:border-b sm:grid-cols-[200px_1fr_auto]"
          >
            <div>
              <h3 className="inline font-mono text-[13px] font-medium text-ink">{project.title}</h3>
              <ScrambleLabel
                text={String(project.year)}
                className="ml-3 font-mono text-[11px] tabular-nums text-muted"
              />
              <span className="mt-1 block font-mono text-[9px] uppercase tracking-[0.12em] text-accent-text">
                {project.category}
              </span>
            </div>
            <div>
              <p className="font-sans text-[0.875rem] leading-relaxed text-muted">{project.oneLiner}</p>
              <p className="mt-1.5 font-mono text-[9px] leading-relaxed tracking-[0.04em] text-muted">
                {project.tech.join(" · ")}
              </p>
            </div>
            <ProjectActions
              liveHref={project.live}
              githubHref={project.repo}
              caseStudyHref={project.caseStudy}
              compact
              reverse
              className="sm:justify-self-end"
            />
          </li>
        ))}

        {enhanced && visibleProjects.length === 0 ? (
          <li className="border-y border-line py-10 text-center">
            <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
              No projects match this view.
            </p>
            <button
              type="button"
              onClick={() => {
                setActiveFilter("All");
                setQuery("");
              }}
              className="u-line mt-3 min-h-11 px-3 font-mono text-[10px] uppercase tracking-[0.12em] text-ink"
            >
              Reset filters
            </button>
          </li>
        ) : null}
      </ul>
    </div>
  );
}
