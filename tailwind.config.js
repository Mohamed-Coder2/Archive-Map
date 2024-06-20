/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
      'white': '#EAF2E3',
      'blue': '#61E8E1',
      'red': '#F25757',
      'yellow': '#F2E863',
      'darkeryellow': '#F2CD60',
      'bubble-gum': '#ff77e9',
      'BYellow': '#022F8E',
      'Black': '#171717'
    },
    },
  },
  plugins: [],
};
