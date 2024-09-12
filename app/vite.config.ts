import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr(), // Add the svgr plugin here
  ],
  resolve: {
    alias: {
      'date-fns/_lib/format/longFormatters': 'date-fns/esm/_lib/format/longFormatters'
    }
  }
});
