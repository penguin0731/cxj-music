import { defineConfig } from 'vite';
import path from 'path';
import createVitePlugins from './vite/plugins/index';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: createVitePlugins(),
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  server: {
    port: 9527,
    host: true,
    open: true
  }
});
