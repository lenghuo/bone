import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://192.168.3.10:8080',
        changeOrigin: true,
        secure: false,
        ws: true,
        rewrite: (path) => path.replace(new RegExp('^/api'), '')
      }
    }
  }
})
