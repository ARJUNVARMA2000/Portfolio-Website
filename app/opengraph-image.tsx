import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Arjun Varma — Data Scientist & ML Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const BG = "#fafaf7";
const INK = "#15171a";
const MUTED = "#62686e";
const LINE = "#e3e3dc";
const ACCENT = "#d9480f";

async function loadGoogleFont(family: string, weight: number) {
  const url = `https://fonts.googleapis.com/css2?family=${family.replace(/ /g, "+")}:wght@${weight}`;
  const css = await fetch(url, {
    headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" },
  }).then((r) => r.text());
  const fontUrl = css.match(/src: url\((.+?)\) format/)?.[1];
  if (!fontUrl) throw new Error(`Font URL not found for ${family}`);
  return fetch(fontUrl).then((r) => r.arrayBuffer());
}

const STATS = [
  { value: "250M", label: "claims scored / mo" },
  { value: "~45d", label: "earlier detection" },
  { value: "99%", label: "accuracy, 10K holdout" },
  { value: "6", label: "live AI systems" },
];

export default async function OpengraphImage() {
  const [fraunces, mono] = await Promise.all([
    loadGoogleFont("Fraunces", 500),
    loadGoogleFont("JetBrains Mono", 500),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 88px 60px",
          background: BG,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontFamily: "Mono",
            fontSize: 18,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: MUTED,
          }}
        >
          <div style={{ display: "flex" }}>ARJUN VARMA — DATA SCIENTIST / ML ENGINEER</div>
          <div style={{ display: "flex", color: ACCENT }}>[ AVAILABLE JAN &rsquo;27 ]</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontFamily: "Fraunces",
              fontSize: 124,
              lineHeight: 1.05,
              color: INK,
              letterSpacing: "-0.02em",
            }}
          >
            Arjun Varma
          </div>
          <div
            style={{
              display: "flex",
              fontFamily: "Mono",
              fontSize: 26,
              color: ACCENT,
              marginTop: 24,
              letterSpacing: "0.06em",
            }}
          >
            production ML · agentic systems · evals that cite their sources
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            borderTop: `1px solid ${LINE}`,
            paddingTop: 28,
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            {STATS.map((s) => (
              <div key={s.label} style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", fontFamily: "Mono", fontSize: 44, color: INK }}>{s.value}</div>
                <div
                  style={{
                    display: "flex",
                    fontFamily: "Mono",
                    fontSize: 15,
                    color: MUTED,
                    marginTop: 8,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                  }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
          <div
            style={{
              display: "flex",
              fontFamily: "Mono",
              fontSize: 16,
              color: MUTED,
              marginTop: 28,
              letterSpacing: "0.1em",
            }}
          >
            arjun-varma.com · av3342@columbia.edu · Novo Nordisk · Columbia MS Data Science
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Fraunces", data: fraunces, style: "normal", weight: 500 },
        { name: "Mono", data: mono, style: "normal", weight: 500 },
      ],
    },
  );
}
