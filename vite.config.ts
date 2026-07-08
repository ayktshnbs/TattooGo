import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    strictPort: true,
    host: '127.0.0.1',
    // The API only runs as Vercel functions — proxy /api to production so
    // `npm run dev` gives a fully working app (auth cookies included).
    proxy: {
      '/api': {
        target: 'https://tattoo-go.vercel.app',
        changeOrigin: true,
      },
    },
  },
});
