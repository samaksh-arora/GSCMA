/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        gscma: {
          "primary": "#4ade80",        // Bright green from logo
          "primary-content": "#ffffff",
          "secondary": "#f59e0b",      // Gold/amber from logo
          "secondary-content": "#ffffff",
          "accent": "#10b981",         // Emerald green
          "accent-content": "#ffffff",
          "neutral": "#374151",        // Dark gray
          "neutral-content": "#ffffff",
          "base-100": "#ffffff",       // White background
          "base-200": "#f9fafb",       // Light gray
          "base-300": "#e5e7eb",       // Medium gray
          "base-content": "#1f2937",   // Dark text
          "info": "#3b82f6",           // Blue
          "info-content": "#ffffff",
          "success": "#10b981",        // Green
          "success-content": "#ffffff",
          "warning": "#f59e0b",        // Amber
          "warning-content": "#ffffff",
          "error": "#ef4444",          // Red
          "error-content": "#ffffff",
        },
      },
      "light",
      "dark"
    ],
    base: true,
    styled: true,
    utils: true,
  },
};
