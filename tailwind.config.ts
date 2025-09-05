import type { Config } from 'tailwindcss'
// Fix: Use an ES module import instead of CommonJS require.
import tailwindcssAnimate from 'tailwindcss-animate'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      container: {
        center: true,
        padding: '1.5rem',
        screens: {
          '2xl': '1400px',
        },
      },
    },
  },
  plugins: [tailwindcssAnimate],
}
export default config