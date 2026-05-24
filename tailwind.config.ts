import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./tina/**/*.{ts,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Palette Salute! — référence visuelle italienne (vert sapin, terracotta, crème).
        // À ajuster avec la charte finale après validation client.
        salute: {
          green: "#1F4E3D",
          terracotta: "#C45A3B",
          cream: "#FBF6EC",
          ink: "#1A1814",
          stone: "#6B6357",
        },
      },
      fontFamily: {
        // Polices auto-hébergées via next/font — voir app/layout.tsx
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        prose: "65ch",
      },
      screens: {
        xs: "360px",
      },
    },
  },
  plugins: [],
};

export default config;
