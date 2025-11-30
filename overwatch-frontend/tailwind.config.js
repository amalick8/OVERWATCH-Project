/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0f172a',     // Deep slate (used in navbar/header)
        secondary: '#334155',   // Slate 700
        accent: '#3b82f6',      // Blue 500 (buttons, links)
        danger: '#ef4444',      // Red 500
        success: '#22c55e',     // Green 500
        warning: '#eab308',     // Yellow 500
      },

      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },

      boxShadow: {
        card: "0 4px 14px rgba(0,0,0,0.08)",    // smooth card shadow
        soft: "0 2px 8px rgba(0,0,0,0.06)",     // light shadow
      },

      borderRadius: {
        xl: "1rem",
        lg: "0.75rem",
      },

      spacing: {
        18: "4.5rem",
        22: "5.5rem",
      },

      maxWidth: {
        "8xl": "90rem",
      },

      transitionTimingFunction: {
        smooth: "cubic-bezier(0.4, 0, 0.2, 1)", // buttery smooth transitions
      },
    },
  },
  plugins: [],
};
