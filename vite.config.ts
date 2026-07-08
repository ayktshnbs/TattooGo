import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    strictPort: true,
    host: '127.0.0.1',
    // The API only runs as Vercel functions — proxy /api to the deployed app
    // so `npm run dev` gives a fully working app (auth cookies included).
    // Override with VITE_API_PROXY when the production domain changes.
    proxy: {
      '/api': {
        target: process.env.VITE_API_PROXY ?? 'https://tattoo-go.vercel.app',
        changeOrigin: true,
      },
    },
  },
});
