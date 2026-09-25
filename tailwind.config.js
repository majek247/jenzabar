/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0C2233",
        harbor: "#12384F",
        wing: "#1C8FB0",
        dawn: "#E7A33E",
        cloud: "#F3F1EA",
        paper: "#FAF9F5",
      },
      fontFamily: {
        display: ["Fraunces", "Georgia", "serif"],
        body: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
