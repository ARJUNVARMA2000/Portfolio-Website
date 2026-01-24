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
        // Theme-aware colors using CSS variables
        bg: {
          DEFAULT: "rgb(var(--bg) / <alpha-value>)",
          secondary: "rgb(var(--bg-secondary) / <alpha-value>)",
        },
        surface: {
          DEFAULT: "rgb(var(--surface) / <alpha-value>)",
          elevated: "rgb(var(--surface-elevated) / <alpha-value>)",
        },
        border: {
          DEFAULT: "rgb(var(--border) / <alpha-value>)",
          glow: "rgb(var(--border-glow) / <alpha-value>)",
        },
        text: {
          DEFAULT: "rgb(var(--text) / <alpha-value>)",
          secondary: "rgb(var(--text-secondary) / <alpha-value>)",
          muted: "rgb(var(--text-muted) / <alpha-value>)",
        },
        accent: {
          DEFAULT: "rgb(var(--accent) / <alpha-value>)",
          secondary: "rgb(var(--accent-secondary) / <alpha-value>)",
          tertiary: "rgb(var(--accent-tertiary) / <alpha-value>)",
          purple: "rgb(var(--accent-purple) / <alpha-value>)",
          cyan: "rgb(var(--accent-cyan) / <alpha-value>)",
          pink: "rgb(var(--accent-pink) / <alpha-value>)",
          blue: "rgb(var(--accent-blue) / <alpha-value>)",
          green: "rgb(var(--accent-green) / <alpha-value>)",
        },
        "on-accent": "rgb(var(--on-accent) / <alpha-value>)",
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        heading: ['var(--font-heading)', 'system-ui', 'sans-serif'],
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "fade-in-up": "fadeInUp 0.8s ease-out forwards",
        "fade-in-down": "fadeInDown 0.8s ease-out forwards",
        "fade-in-left": "fadeInLeft 0.8s ease-out forwards",
        "fade-in-right": "fadeInRight 0.8s ease-out forwards",
        "float": "float 6s ease-in-out infinite",
        "float-slow": "float 8s ease-in-out infinite",
        "float-delayed": "float 6s ease-in-out infinite 2s",
        "pulse-soft": "pulseSoft 3s ease-in-out infinite",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
        "spin-slow": "spin 8s linear infinite",
        "gradient-shift": "gradientShift 5s ease infinite",
        "border-rotate": "borderRotate 4s linear infinite",
        "shimmer": "shimmer 3s infinite",
        "orb-pulse": "orbPulse 8s ease-in-out infinite",
        "bounce-soft": "bounceSoft 2s ease-in-out infinite",
        "scale-in": "scaleIn 0.5s ease-out forwards",
        "slide-up": "slideUp 0.5s ease-out forwards",
        "slide-down": "slideDown 0.5s ease-out forwards",
        "glow": "glow 2s ease-in-out infinite alternate",
      },
      keyframes: {
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        fadeInUp: {
          from: { opacity: "0", transform: "translateY(30px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        fadeInDown: {
          from: { opacity: "0", transform: "translateY(-30px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        fadeInLeft: {
          from: { opacity: "0", transform: "translateX(-30px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        fadeInRight: {
          from: { opacity: "0", transform: "translateX(30px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-15px)" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.8" },
        },
        pulseGlow: {
          "0%, 100%": {
            boxShadow: "0 0 20px rgb(var(--accent-purple) / 0.18)",
          },
          "50%": {
            boxShadow: "0 0 40px rgb(var(--accent-purple) / 0.35)",
          },
        },
        gradientShift: {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        borderRotate: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "300% 50%" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
        orbPulse: {
          "0%, 100%": { opacity: "0.3", transform: "scale(1)" },
          "50%": { opacity: "0.5", transform: "scale(1.1)" },
        },
        bounceSoft: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        scaleIn: {
          from: { opacity: "0", transform: "scale(0.9)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
        slideUp: {
          from: { opacity: "0", transform: "translateY(100%)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        slideDown: {
          from: { opacity: "0", transform: "translateY(-100%)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        glow: {
          from: {
            boxShadow: "0 0 20px rgb(var(--accent-purple) / 0.2), 0 0 40px rgb(var(--accent-cyan) / 0.12)",
          },
          to: {
            boxShadow: "0 0 30px rgb(var(--accent-purple) / 0.35), 0 0 60px rgb(var(--accent-cyan) / 0.2)",
          },
        },
      },
      boxShadow: {
        "glow-sm": "0 0 20px rgb(var(--accent-purple) / 0.12)",
        "glow": "0 0 40px rgb(var(--accent-purple) / 0.16)",
        "glow-lg": "0 0 60px rgb(var(--accent-purple) / 0.2)",
        "glow-xl": "0 0 80px rgb(var(--accent-purple) / 0.25)",
        "glow-cyan": "0 0 40px rgb(var(--accent-cyan) / 0.16)",
        "glow-pink": "0 0 40px rgb(var(--accent-pink) / 0.16)",
        "card": "0 4px 20px rgb(0 0 0 / 0.15)",
        "card-hover": "0 20px 40px rgb(0 0 0 / 0.25)",
        "inner-glow": "inset 0 0 30px rgb(var(--accent-purple) / 0.06)",
      },
      borderRadius: {
        "xl": "16px",
        "2xl": "20px",
        "3xl": "24px",
        "4xl": "32px",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "aurora": "linear-gradient(135deg, rgb(var(--accent-purple)), rgb(var(--accent-cyan)), rgb(var(--accent-pink)))",
        "aurora-soft": "linear-gradient(135deg, rgb(var(--accent-purple) / 0.5), rgb(var(--accent-cyan) / 0.5), rgb(var(--accent-pink) / 0.5))",
      },
      blur: {
        "4xl": "80px",
        "5xl": "100px",
      },
      transitionTimingFunction: {
        "bounce-soft": "cubic-bezier(0.34, 1.56, 0.64, 1)",
        "smooth": "cubic-bezier(0.4, 0, 0.2, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
