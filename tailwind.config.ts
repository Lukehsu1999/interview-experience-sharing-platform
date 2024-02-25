import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        '13': 'repeat(13, minmax(0, 1fr))',
      },
      colors: {
        blue: {
          400: '#2589FE',
          500: '#0070F3',
          600: '#2F6FEB',
        },
        'miumee-color':{
          400: '#5ABCB9',
          500: '#036E7A', // logo color
          600: '#01373D',
        },
        'miumeeblue':{
          100: '#D5F5F9',
          400: '#03DAF2',
          500: '#03C0D5'
        },
        'highlightgreen':{
          100: '#D3FB52',
          200: '#AEE22D',
          300: '#9ECB1C'
        },
        'columbia-blue':{
          400: '#123C72'
        }
      },
    },
    keyframes: {
      shimmer: {
        '100%': {
          transform: 'translateX(100%)',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
export default config;
