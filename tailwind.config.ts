import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        "spin-slow": "spin 3s linear infinite",
      },
      colors: {
        primary: "rgb(var(--color-primary) / <alpha-value>)",
        "priority-low": "rgb(var(--color-priority-low) / <alpha-value>)",
        "priority-medium": "rgb(var(--color-priority-medium) / <alpha-value>)",
        "priority-high": "rgb(var(--color-priority-high) / <alpha-value>)",
      },
      borderColor: {
        primary: "rgb(var(--color-primary) / <alpha-value>)",
      },
    },
  },
  plugins: [],
};
export default config;
