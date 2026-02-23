import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './components/**/*.{vue,ts}',
    './layouts/**/*.{vue,ts}',
    './pages/**/*.{vue,ts}',
    './app.vue',
    './content/**/*.{md,json}'
  ],
  theme: {
    extend: {
      fontFamily: {
        'serif': ['Lora', 'Georgia', 'serif'],
        'display': ['Poiret One', 'Playfair Display', 'Georgia', 'serif']
      }
    }
  },
  plugins: []
}

export default config
