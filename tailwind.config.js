module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    screens: {
      "sm": "640px",
      "md": "768px",
      "1000px": "1000px",
      "lg": "1024px",
      "xl": "1280px",
      "2xl": "1536px",
    },
    colors: {
      transparent: "transparent",
      white: "#ffffff",
      gray: {
        100: "#fafafa",
        200: "#dbdbdb",
        300: "#8e8e8e",
      },
      blue: "#0095F6",
    },
  },
  plugins: [],
};
