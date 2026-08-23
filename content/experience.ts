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
    location: "Plainsboro, NJ",
    period: "Jun 2026 — present",
    current: true,
    roles: [
      {
        title: "Data Science Intern — Commercial Data Science",
        period: "Jun 2026 — present",
        bullets: [
          "Improved propensity scoring and next-best-engagement models, then built an LLM decision-support layer that turns behavioral, access, competitive, and adoption signals into explainable field guidance.",
          "Integrated longitudinal claims with unmet-need, market-opportunity, and early-adoption signals to prioritize ~500 of 10,000+ providers nationwide.",
          "Achieved 5.2x top-decile lift with an XGBoost propensity model using provider profile, prescribing, access, and engagement features; combined predictions with rule-based signals into explainable priority tiers and a nationwide planning dashboard.",
          "Supporting pre-launch analytics for investigational denecimig (Mim8), informing HCP targeting and field readiness.",
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
          "Reduced weekly decision cycles from days to minutes for 100+ stakeholders across a $10B portfolio by translating 5+ high-volume sources into a reusable Spark/SQL data warehouse, product KPIs, and self-service analyses.",
          "Productionized models with MLflow tracking, feature and prediction drift monitoring, and CI validation to reduce silent failures.",
        ],
      },
      {
        title: "Decision Analytics Associate Consultant",
        period: "Jul 2024 — Jan 2025",
        bullets: [
          "Built and deployed positive-unlabeled learning models that recovered missing categorical labels in sparse medical transaction data, expanding analytical coverage from ~40% to 95% across segments and territories.",
          "Raised first-pass analytical quality above 99% and saved ~50 hours per month by leading a five-member modernization of legacy business rules into validated, reusable logic.",
        ],
      },
      {
        title: "Decision Analytics Associate",
        period: "Feb 2022 — Jun 2024",
        bullets: [
          "Established audit-ready real-world evidence modeling and segmentation across $4B+ in products by designing cohort and entity features over millions of incomplete and miscoded records.",
          "Engineered PySpark/SQL ETL across healthcare sources and defined patient inclusion and exclusion logic robust to missing and miscoded fields.",
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
