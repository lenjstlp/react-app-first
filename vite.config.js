import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

import { visualizer } from 'rollup-plugin-visualizer'
import AutoImport from 'unplugin-auto-import/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    visualizer({
      filename: 'size.html',
      title: '项目体积分析报告',
      open: false,
      gzipSize: true,
      brotliSize: true,
      emitFile: false
    }),
    AutoImport({
      imports: ['react', 'react-router-dom'],
      eslintrc: {
        enabled: true
      }
    })
  ],
  resolve: {
    alias: [
      {
        find: '@',
        replacement: path.resolve(__dirname, 'src')
      }
    ]
  },
  server: {
    port: '9090',
    host: '0.0.0.0',
    proxy: {
      '/api': {
        target: 'http://localhost:4399',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
