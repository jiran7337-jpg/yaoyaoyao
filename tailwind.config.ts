import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        bg: '#070617',
        card: '#12112a',
        accent: '#d8b56f',
        violet: '#7d5fff',
        indigo: '#4d5dfb'
      },
      boxShadow: {
        glow: '0 0 24px rgba(216,181,111,0.35)',
        violetGlow: '0 0 24px rgba(125,95,255,0.35)'
      },
      backgroundImage: {
        mystic:
          'radial-gradient(circle at 20% 10%, rgba(125,95,255,0.24), transparent 42%), radial-gradient(circle at 80% 0%, rgba(216,181,111,0.18), transparent 36%), linear-gradient(180deg, #070617 0%, #0c0b22 60%, #070617 100%)'
      }
    }
  },
  plugins: []
};

export default config;
