export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "rgb(var(--color-primary) / <alpha-value>)",
        },
      },
    },
  },
  plugins: [],
};
