export const SITE = {
  name: "Arjun Varma",
  url: "https://arjun-varma.com",
  email: "av3342@columbia.edu",
  github: "https://github.com/ARJUNVARMA2000",
  linkedin: "https://www.linkedin.com/in/varma-arjun/",
  resume: "/resume.pdf",
  role: "Data Scientist / ML Engineer",
  location: "New York",
  title: "Arjun Varma — Data Scientist & ML Engineer",
  description:
    "Data Scientist and ML Engineer building forecasting, decision-support, and agentic systems. Data Science Intern at Novo Nordisk and M.S. Data Science candidate at Columbia. Available for full-time roles from January 2027.",
  availability: "Available full-time · January 2027",
  lastUpdated: "2026-07-17",
} as const;

export type Education = {
  school: string;
  degree: string;
  period: string;
  note: string;
};

export const EDUCATION: Education[] = [
  {
    school: "Columbia University",
    degree: "M.S. Data Science",
    period: "Aug 2025 — Dec 2026",
    note: "TA — Business Analytics II (Foundations of AI) · Hollywood & Big Data, Columbia Business School",
  },
  {
    school: "Vellore Institute of Technology",
    degree: "B.Tech, Electronics & Communication Engineering",
    period: "Jul 2018 — May 2022",
    note: "Special Achiever Award · Merit Scholarship",
  },
];
