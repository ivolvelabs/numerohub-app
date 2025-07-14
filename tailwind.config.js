// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  // In Tailwind CSS v4.1, the 'content' array is still crucial.
  // It tells Tailwind where to scan your files for utility classes.
  // This is how Tailwind knows which CSS to generate.
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./context/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  // The 'theme' object here is largely deprecated for customization in v4.1.
  // Custom colors and fonts are now defined in your global CSS using @theme.
  theme: {
    extend: {
      // You might use 'extend' here for very advanced, non-standard theme extensions
      // that cannot be expressed via CSS variables in @theme.
      // For basic colors and fonts, @theme in CSS is the preferred way.
    },
  },
  plugins: [], // No additional Tailwind plugins are used in this MVP
};
