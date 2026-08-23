import type { AgentName } from "@/content/traces";

/** Role hues shared by the architecture diagram and the trace replay, so they read as one system. */
export const AGENT_COLORS: Record<AgentName, string> = {
  planner: "#7fa6d9",
  sql: "#d9b36c",
  db: "#9aa1a8",
  validator: "#7fbf8e",
  chart: "#b48ead",
  narrator: "#e85d24",
};
