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
  define: {
    'import.meta.env.VERCEL': JSON.stringify(process.env.VERCEL),
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-three': ['three', '@react-three/fiber', '@react-three/drei'],
          'vendor-motion': ['framer-motion'],
        },
      },
    },
  },
});