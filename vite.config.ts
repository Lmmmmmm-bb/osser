import { resolve } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  envPrefix: 'OSSER_',
  plugins: [
    react(),
    visualizer({
      open: true,
      filename: './dist/visualizer.html',
    }),
  ],
  resolve: {
    alias: {
      '~': resolve(__dirname, 'src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          dom: ['react-dom'],
          react: ['react', 'react-hot-toast'],
        },
      },
    },
  },
});
