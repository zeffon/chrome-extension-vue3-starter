import path, { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const root = resolve(__dirname, 'src')
const browserDir = resolve(root, 'browser')
const outDir = resolve(__dirname, 'dist')

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'src'),
    },
  },
  build: {
    outDir,
    rollupOptions: {
      input: {
        content: resolve(browserDir, 'content', 'index.ts'),
        background: resolve(browserDir, 'background', 'index.ts'),
        popup: resolve(browserDir, 'popup', 'index.html'),
        options: resolve(browserDir, 'options', 'index.html'),
      },
      watch: {
        include: ['src/**', 'vite.config.ts'],
        exclude: ['node_modules/**'],
      },
      output: {
        entryFileNames: 'src/browser/[name]/index.js',
        chunkFileNames: 'assets/js/[name].js',
      },
    },
  },
})
