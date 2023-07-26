import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import setupExtend from 'vite-plugin-vue-setup-extend';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), setupExtend()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  server: {
    open: true
  }
})
