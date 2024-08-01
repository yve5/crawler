import react from '@vitejs/plugin-react';
import eslint from 'vite-plugin-eslint';
import { defineConfig } from 'vite';

export default defineConfig({
  test: { environment: 'jsdom', globals: true },
  plugins: [
    // eslint({
    //   // overrideConfigFile: './.eslintrc.js',
    //   // overrideConfigFile: './eslint.config.mjs',
    // }),
    eslint(),
    react(),
  ],
  build: { outDir: './build' },
  assetsInclude: ['**/*.md'],
});
