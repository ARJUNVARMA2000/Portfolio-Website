import Image from "next/image";

const SCREENS = [
  { src: "/images/deuce/home.png", alt: "DEUCE match forecast dashboard", label: "Forecasts" },
  { src: "/images/deuce/rankings.png", alt: "DEUCE ATP and WTA model rankings", label: "Rankings" },
  { src: "/images/deuce/style.png", alt: "DEUCE player style analysis", label: "Player style" },
];

export function DeuceScreens() {
  return (
    <div className="grid gap-3 border border-line bg-surface p-3 sm:grid-cols-3 sm:p-4">
      {SCREENS.map((screen) => (
        <div key={screen.src} className="overflow-hidden border border-line bg-bg">
          <div className="flex items-center justify-between border-b border-line px-3 py-2 font-mono text-[9px] uppercase tracking-[0.14em] text-muted">
            <span>{screen.label}</span>
            <span className="text-accent">Live</span>
          </div>
          <Image
            src={screen.src}
            alt={screen.alt}
            width={1440}
            height={900}
            className="h-auto w-full"
            sizes="(min-width: 640px) 30vw, 90vw"
          />
        </div>
      ))}
    </div>
  );
}
