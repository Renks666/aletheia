import type {Config} from "tailwindcss";

const config: Config = {
  darkMode: ["class", '[data-theme="aletheia"]'],
  content: ["./src/**/*.{ts,tsx}", "./middleware.ts"],
  theme: {
    container: {
      center: true,
      padding: "1.2rem",
      screens: {
        "2xl": "1140px",
      },
    },
    extend: {
      colors: {
        bg: "var(--color-bg-950)",
        surface: "var(--color-surface-900)",
        text: "var(--color-text-100)",
        muted: "var(--color-text-400)",
        primary: {
          600: "var(--color-primary-600)",
          800: "var(--color-primary-800)",
        },
        bronze: {
          300: "var(--color-bronze-300)",
          500: "var(--color-bronze-500)",
          700: "var(--color-bronze-700)",
        },
        line: {
          soft: "var(--color-line-soft)",
          strong: "var(--color-line-strong)",
        },
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "calc(var(--radius-lg) + 0.5rem)",
      },
      boxShadow: {
        volume: "var(--shadow-volume)",
        cta: "var(--shadow-cta-hover)",
      },
      fontFamily: {
        heading: ["var(--font-heading)", "var(--font-body)", "Segoe UI", "Arial", "sans-serif"],
        body: ["var(--font-body)", "var(--font-fallback-sans)", "Segoe UI", "Arial", "sans-serif"],
        accent: ["var(--font-accent)", "var(--font-body)", "Segoe UI", "Arial", "sans-serif"],
      },
      backgroundImage: {
        hero: "var(--gradient-hero)",
        cta: "var(--gradient-cta)",
        overlay: "var(--gradient-overlay)",
      },
      keyframes: {
        "fade-up": {
          "0%": {opacity: "0", transform: "translate3d(0, 18px, 0)"},
          "100%": {opacity: "1", transform: "translate3d(0, 0, 0)"},
        },
        shimmer: {
          "0%": {backgroundPosition: "-200% 0"},
          "100%": {backgroundPosition: "200% 0"},
        },
        float: {
          "0%, 100%": {transform: "translateY(0)"},
          "50%": {transform: "translateY(-8px)"},
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out both",
        shimmer: "shimmer 2.6s linear infinite",
        float: "float 5.2s ease-in-out infinite",
      },
    },
  },
};

export default config;
