import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import Sitemap from 'vite-plugin-sitemap';

export default defineConfig({
  plugins: [
    react(),
    Sitemap({
      hostname: 'https://kartikey.is-a.dev',
      dynamicRoutes: [
        '/',
        '/about',
        '/projects',
        '/skills',
        '/contact',
        '/blog'
      ]
    })
  ],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});