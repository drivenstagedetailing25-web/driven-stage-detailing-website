// @ts-check
import { defineConfig } from 'astro/config'
import tailwindcss from '@tailwindcss/vite'
import react from '@astrojs/react';


import vercel from '@astrojs/vercel';


import sitemap from '@astrojs/sitemap';


// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },

  site: 'https://www.drivenstagedetailing.com',

  integrations: [react(), sitemap()],
  output: 'server',
  adapter: vercel(),
})