import type { Config } from 'tailwindcss'

export default {
  content: ['./app/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      keyframes:{
        bgdrift:{
          '0%,100%':{'background-position':'0% 50%'},
          '50%':{'background-position':'100% 50%'}

        }
      }
    }
  },
  plugins: [],
} satisfies Config

