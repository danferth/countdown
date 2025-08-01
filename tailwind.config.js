/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./styles/**/*.css",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-work-sans)"],
        mono: ["var(--font-chivo-mono)"],
        cursive: ["var(--font-Edu-SA-Beginner)"],
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
