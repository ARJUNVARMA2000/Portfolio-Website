import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Theme tokens driven by CSS variables (see app/globals.css).
        // Use these instead of hard-coded cyber colors so we can swap full site skins.
        t: {
          bg: "rgb(var(--t-bg) / <alpha-value>)",
          bg2: "rgb(var(--t-bg2) / <alpha-value>)",
          surface: "rgb(var(--t-surface) / <alpha-value>)",
          text: "rgb(var(--t-text) / <alpha-value>)",
          muted: "rgb(var(--t-muted) / <alpha-value>)",
          muted2: "rgb(var(--t-muted2) / <alpha-value>)",
          border: "rgb(var(--t-border) / <alpha-value>)",
          accent: "rgb(var(--t-accent) / <alpha-value>)",
          accent2: "rgb(var(--t-accent2) / <alpha-value>)",
          accent3: "rgb(var(--t-accent3) / <alpha-value>)",
          onAccent: "rgb(var(--t-on-accent) / <alpha-value>)",
        },
        cyber: {
          black: "#0a0a0f",
          darker: "#050508",
          cyan: "#00fff5",
          magenta: "#ff00ff",
          yellow: "#ffff00",
          pink: "#ff2a6d",
          purple: "#7b2cbf",
          blue: "#05d9e8",
        },
      },
      fontFamily: {
        // Keep the old names (used widely), but route through CSS vars so they can change by theme.
        cyber: ["var(--t-font-brand)", "sans-serif"],
        brand: ["var(--t-font-brand)", "sans-serif"],
        mono: ["var(--t-font-mono)", "monospace"],
        body: ["var(--t-font-body)", "sans-serif"],
      },
      animation: {
        "glitch": "glitch 1s linear infinite",
        "glitch-2": "glitch-2 1.2s linear infinite",
        "pulse-neon": "pulse-neon 2s ease-in-out infinite",
        "flicker": "flicker 3s linear infinite",
        "scanline": "scanline 8s linear infinite",
        "float": "float 6s ease-in-out infinite",
        "typing": "typing 3.5s steps(40, end), blink-caret 0.75s step-end infinite",
        "grid-flow": "grid-flow 20s linear infinite",
      },
      keyframes: {
        glitch: {
          "0%, 100%": { transform: "translate(0)" },
          "20%": { transform: "translate(-2px, 2px)" },
          "40%": { transform: "translate(-2px, -2px)" },
          "60%": { transform: "translate(2px, 2px)" },
          "80%": { transform: "translate(2px, -2px)" },
        },
        "glitch-2": {
          "0%, 100%": { transform: "translate(0)", opacity: "1" },
          "33%": { transform: "translate(3px, -2px)", opacity: "0.8" },
          "66%": { transform: "translate(-3px, 2px)", opacity: "0.8" },
        },
        "pulse-neon": {
          "0%, 100%": { 
            boxShadow: "0 0 5px #00fff5, 0 0 10px #00fff5, 0 0 20px #00fff5",
            borderColor: "#00fff5",
          },
          "50%": { 
            boxShadow: "0 0 10px #00fff5, 0 0 20px #00fff5, 0 0 40px #00fff5",
            borderColor: "#05d9e8",
          },
        },
        flicker: {
          "0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100%": { opacity: "1" },
          "20%, 21.999%, 63%, 63.999%, 65%, 69.999%": { opacity: "0.4" },
        },
        scanline: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
        typing: {
          from: { width: "0" },
          to: { width: "100%" },
        },
        "blink-caret": {
          "from, to": { borderColor: "transparent" },
          "50%": { borderColor: "#00fff5" },
        },
        "grid-flow": {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(50px)" },
        },
      },
      boxShadow: {
        "neon-cyan": "0 0 5px #00fff5, 0 0 10px #00fff5, 0 0 20px #00fff5, 0 0 40px #00fff5",
        "neon-magenta": "0 0 5px #ff00ff, 0 0 10px #ff00ff, 0 0 20px #ff00ff, 0 0 40px #ff00ff",
        "neon-yellow": "0 0 5px #ffff00, 0 0 10px #ffff00, 0 0 20px #ffff00",
        "glow-sm": "0 0 10px rgba(0, 255, 245, 0.5)",
        "glow-md": "0 0 20px rgba(0, 255, 245, 0.5)",
        "glow-lg": "0 0 40px rgba(0, 255, 245, 0.7)",
      },
      backgroundImage: {
        "cyber-grid": "linear-gradient(rgba(0, 255, 245, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 245, 0.03) 1px, transparent 1px)",
        "cyber-gradient": "linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 50%, #0a0a0f 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
