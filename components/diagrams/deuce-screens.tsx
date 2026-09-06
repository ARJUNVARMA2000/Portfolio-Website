import Image from "next/image";

const SCREENS = [
  { src: "/images/deuce/home.png", alt: "DEUCE match forecast dashboard", label: "Forecasts" },
  { src: "/images/deuce/rankings.png", alt: "DEUCE ATP and WTA model rankings", label: "Rankings" },
  { src: "/images/deuce/style.png", alt: "DEUCE player style analysis", label: "Player style" },
];

export function DeuceScreens() {
  return (
    <div className="grid gap-4 border border-line bg-surface p-3 sm:grid-cols-2 sm:p-4">
      {SCREENS.map((screen, index) => (
        <a key={screen.src} href={screen.src} target="_blank" rel="noopener noreferrer" aria-label={"Open " + screen.label.toLowerCase() + " screenshot at full size"} className={"group overflow-hidden border border-line bg-bg no-underline " + (index === 0 ? "sm:col-span-2" : "")}>
          <div className="flex items-center justify-between border-b border-line px-3 py-2 font-mono text-[11px] text-muted">
            <span>{screen.label}</span>
            <span className="text-accent-text">View full size ↗</span>
          </div>
          <Image
            src={screen.src}
            alt={screen.alt}
            width={1440}
            height={900}
            className="h-auto w-full transition-opacity group-hover:opacity-90"
            sizes={index === 0 ? "(min-width: 1024px) 900px, 90vw" : "(min-width: 640px) 440px, 90vw"}
          />
        </a>
      ))}
    </div>
  );
}
