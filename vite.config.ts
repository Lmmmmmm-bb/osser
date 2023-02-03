import { resolve } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  envPrefix: 'OSSER_',
  plugins: [react()],
  resolve: {
    alias: {
      '~': resolve(__dirname, 'src')
    }
  }
});
