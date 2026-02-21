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
    extend: {}
  },
  plugins: []
}

export default config
