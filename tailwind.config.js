/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        redhatdisplay: ['var(--font-red-hat-display)'],
        lora: ['var(--font-lora)'],
        rocksalt: ['var(--font-rocksalt)'],
        unbounded: ['var(--font-unbounded)'],
        clashDisplay: ['var(--font-clash-display)'],
        berkshireswash: ['var(--font-berkshireswash)'],
        beyonders: ['var(--font-beyonders)'],
        amsterdamone: ['var(--font-amsterdamone)'],
      },
    },
  },
  plugins: [],
}
