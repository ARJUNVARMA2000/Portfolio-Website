import { ImageResponse } from "next/og";
import { getCaseStudy } from "@/content/case-studies";

export const runtime = "edge";
export const alt = "Arjun Varma project case study";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function ProjectOpenGraphImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  const title = cs?.title ?? "Project case study";
  const metrics = cs?.metrics.slice(0, 3) ?? [];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 76px",
          background: "#fafaf7",
          color: "#15171a",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 17, letterSpacing: "0.14em", textTransform: "uppercase" }}>
          <span>Arjun Varma · Case study</span>
          <span style={{ color: "#d9480f" }}>{cs?.status ?? "shipped"}</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 960 }}>
          <span style={{ color: "#62686e", fontSize: 22, marginBottom: 18 }}>{cs?.org}</span>
          <span style={{ fontFamily: "Georgia, serif", fontSize: 82, lineHeight: 1.04, letterSpacing: "-0.035em" }}>{title}</span>
        </div>
        <div style={{ display: "flex", borderTop: "1px solid #e3e3dc", paddingTop: 25, gap: 70 }}>
          {metrics.map((metric) => (
            <div key={metric.label} style={{ display: "flex", flexDirection: "column", maxWidth: 270 }}>
              <span style={{ color: "#d9480f", fontSize: 32, fontWeight: 600 }}>{metric.value}</span>
              <span style={{ color: "#62686e", fontSize: 14, letterSpacing: "0.08em", textTransform: "uppercase", marginTop: 7 }}>{metric.label}</span>
            </div>
          ))}
        </div>
      </div>
    ),
    size
  );
}
