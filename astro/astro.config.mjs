import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import netlify from '@astrojs/netlify';

export default defineConfig({
  site: 'https://learnify.netlify.app',
  output: 'server',
  adapter: netlify(),
  integrations: [tailwind({ applyBaseStyles: false })],
  vite: {
    ssr: {
      external: ['node-fetch'],
    },
  },
});

