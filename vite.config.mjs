import react from '@vitejs/plugin-react';
import eslint from 'vite-plugin-eslint';
import { defineConfig } from 'vite';

export default defineConfig({
  test: { environment: 'jsdom', globals: true },
  plugins: [eslint(), react()],
  build: { outDir: './build' },
  assetsInclude: ['**/*.md'],
  base: '/crawler',
  define: {
    // By default, Vite doesn't include shims for NodeJS/
    // necessary for segment analytics lib to work
    global: {},
  },
});
