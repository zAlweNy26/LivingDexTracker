import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Sitemap from 'vite-plugin-sitemap'
import tsconfigPaths from 'vite-tsconfig-paths'
import dns from 'dns'

dns.setDefaultResultOrder('verbatim')

// https://vitejs.dev/config/
export default defineConfig({
  envPrefix: "PUBLIC_",
  plugins: [
    vue(), 
    tsconfigPaths(), 
    Sitemap({
      hostname: "https://livingdextracker-fd.web.app/"
    })
  ],
})
