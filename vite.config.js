import path from 'path';

import { defineConfig } from 'vite';

export default defineConfig({
  root: './',
  publicDir: 'public',
  base: '/solar-system-portfolio/',
  server: {
    host: true,
    open: !('SANDBOX_URL' in process.env || 'CODESANDBOX_HOST' in process.env)
  },
  resolve: {
    alias: {
      '@model': path.resolve(__dirname, 'modelLoader'),
      '@solar': path.resolve(__dirname, 'solarSystem'),
    }
  },
  build: {
    target: 'esnext',
    outDir: 'docs',
    emptyOutDir: true,
    sourcemap: true,
  }
});