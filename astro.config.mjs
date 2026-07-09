// @ts-check
import { defineConfig } from 'astro/config'
import tailwindcss from '@tailwindcss/vite'
import react from '@astrojs/react';
import { fileURLToPath } from 'url';
import path from 'path';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
  },

  site: 'https://www.drivenstagedetailing.com',
  integrations: [react(), sitemap()],
  output: 'server',
  adapter: vercel(),
})