import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://learnify.netlify.app',
  output: 'static',
  vite: {
    ssr: {
      external: ['node-fetch'],
    },
  },
});
