/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./index.html",
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    darkMode: 'class', // or 'media'
    theme: {
      extend: {
        colors: {
          primary: "#4F46E5",
          secondary: "#7C3AED",
          accent: "#10B981",
          danger: "#EF4444",
          background: "#F9FAFB",
          darkbg: "#1F2937",
          muted: "#6B7280",
        },
        borderRadius: {
          xl: "1rem",
          "2xl": "1.5rem",
        },
        fontFamily: {
          sans: ["'Inter'", "sans-serif"],
          heading: ["'Poppins'", "sans-serif"],
        },
        boxShadow: {
          soft: "0 4px 12px rgba(0, 0, 0, 0.1)",
        },
      },
    },
    colors: {
      primary: "#4f46e5", // Or any other color you'd like
    },    
    
    plugins: [
      require("@tailwindcss/forms"),
      require("@tailwindcss/typography"),
      require("@tailwindcss/aspect-ratio"),
      require("tailwind-scrollbar"),
    ],
  }
  