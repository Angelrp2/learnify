import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://learnify.netlify.app',
  output: 'static',
  integrations: [tailwind({ applyBaseStyles: false })],
  vite: {
    ssr: {
      external: ['node-fetch'],
    },
  },
});
