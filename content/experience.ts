export type Role = {
  title: string;
  period: string;
  bullets: string[];
};

export type Experience = {
  org: string;
  location: string;
  period: string;
  current?: boolean;
  roles: Role[];
  footnote?: string;
};

export const EXPERIENCE: Experience[] = [
  {
    org: "Novo Nordisk",
    location: "New York",
    period: "Summer 2026",
    current: true,
    roles: [
      {
        title: "Data Science Intern — Commercial Data Science",
        period: "Summer 2026",
        bullets: [
          "Commercial Data Science team, working across the Rare Disease and Wegovy/Ozempic portfolios.",
        ],
      },
    ],
  },
  {
    org: "ZS Associates",
    location: "Pune",
    period: "Feb 2022 — Jun 2025",
    roles: [
      {
        title: "Advanced Data Science Associate Consultant",
        period: "Feb 2025 — Jun 2025",
        bullets: [
          "Shipped the biliary tract cancer early-detection model — 250M patient-claims scored monthly, in production.",
          "Unified 5+ data sources into an org-wide analytics platform used by 100+ stakeholders on a $10B oncology portfolio; cut weekly reporting from days to minutes.",
        ],
      },
      {
        title: "Decision Analytics Associate Consultant",
        period: "Jul 2024 — Jan 2025",
        bullets: [
          "Built and deployed Positive-Unlabeled learning models that lifted customer-journey coverage from ~40% to ~95% in medical transaction data.",
          "Implemented feature and prediction drift monitoring plus CI unit tests for production pipelines; led a 5-member team modernizing legacy business rules (~50 hrs/mo saved, >99% first-pass quality).",
        ],
      },
      {
        title: "Decision Analytics Associate",
        period: "Feb 2022 — Jun 2024",
        bullets: [
          "Engineered PySpark/SQL ETL across healthcare sources covering millions of patients for $4B+ oncology drug analytics.",
          "Defined audit-ready patient cohort inclusion/exclusion logic robust to missing and miscoded fields.",
        ],
      },
    ],
    footnote: "Promoted to Associate Consultant in 4 cycles (typical: 5). Expert Associate and Insight Illuminator awards.",
  },
  {
    org: "Columbia University",
    location: "New York",
    period: "2025 — present",
    roles: [
      {
        title: "Graduate Teaching Assistant",
        period: "2025 — present",
        bullets: [
          "TA for Business Analytics II (Foundations of AI) and Hollywood & Big Data at Columbia Business School.",
        ],
      },
    ],
  },
];
