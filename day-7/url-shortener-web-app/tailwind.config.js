/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          red: 'hsl(356, 100%, 61%)',
          blue: 'hsl(190, 100%, 39%)',
          slate: 'hsl(208, 25%, 37%)',
        },
        bg: {
          main: 'hsl(202, 25%, 94%)',
          bar: 'hsl(207, 22%, 90%)',
        },
      },
    },
  },
  plugins: [],
};
