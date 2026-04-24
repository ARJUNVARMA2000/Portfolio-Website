import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Arjun Varma — Field Notes · Data Scientist & ML Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const PAPER = "#f6efe0";
const INK = "#1b1a16";
const MUTED = "#6d6656";
const ACCENT = "#b4531f";
const GRID = "#d8cfba";

async function loadGoogleFont(family: string, weight: number) {
  const url = `https://fonts.googleapis.com/css2?family=${family.replace(/ /g, "+")}:wght@${weight}`;
  const css = await fetch(url, {
    headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" },
  }).then((r) => r.text());
  const fontUrl = css.match(/src: url\((.+?)\) format/)?.[1];
  if (!fontUrl) throw new Error(`Font URL not found for ${family}`);
  return fetch(fontUrl).then((r) => r.arrayBuffer());
}

export default async function OpengraphImage() {
  const [fraunces, grotesk, caveat] = await Promise.all([
    loadGoogleFont("Fraunces", 600),
    loadGoogleFont("Familjen Grotesk", 400),
    loadGoogleFont("Caveat", 500),
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
          padding: "80px 96px",
          background: PAPER,
          backgroundImage: `linear-gradient(to right, ${GRID} 1px, transparent 1px), linear-gradient(to bottom, ${GRID} 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      >
        <div
          style={{
            display: "flex",
            fontFamily: "Grotesk",
            fontSize: 20,
            letterSpacing: "0.24em",
            textTransform: "uppercase",
            color: ACCENT,
          }}
        >
          [ Field Notes — page 1 of ∞ ]
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontFamily: "Fraunces",
              fontSize: 148,
              lineHeight: 1,
              color: INK,
              letterSpacing: "-0.02em",
            }}
          >
            Arjun Varma
          </div>
          <div
            style={{
              display: "flex",
              fontFamily: "Grotesk",
              fontSize: 34,
              color: INK,
              marginTop: 20,
            }}
          >
            data scientist · ML engineer · building agents
          </div>
          <div
            style={{
              display: "flex",
              width: 160,
              height: 4,
              background: ACCENT,
              marginTop: 20,
            }}
          />
          <div
            style={{
              display: "flex",
              fontFamily: "Caveat",
              fontSize: 44,
              color: ACCENT,
              marginTop: 16,
            }}
          >
            Novo Nordisk Summer &rsquo;26 · Columbia MS · open to full-time Jan &rsquo;27
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            fontFamily: "Grotesk",
            fontSize: 18,
            color: MUTED,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
          }}
        >
          <div style={{ display: "flex" }}>arjun-varma.com</div>
          <div style={{ display: "flex" }}>av3342@columbia.edu</div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Fraunces", data: fraunces, style: "normal", weight: 600 },
        { name: "Grotesk", data: grotesk, style: "normal", weight: 400 },
        { name: "Caveat", data: caveat, style: "normal", weight: 500 },
      ],
    },
  );
}
