module.exports = {
  content: ["./app/**/*.{ts,tsx,jsx,js}"],
  theme: {
    extend: {
      colors: {
        "primary": "#031412",
      },
      fontFamily: {
        body: ["Mont"],
        lighthaus: ["Lighthaus"],
      },
      fontSize: {
        base: "16px",
        h1: "100px",
        h2: "50px",
      },
      transitionDuration: {
        "default": "0.15s",
      }
    },
    widths: {},
  },
  plugins: [
    require('tailwindcss-gradients'),
  ],
};
