import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  build: {
    outDir: 'dist',
    target: ['es2015', 'safari11'],
    cssTarget: 'safari11',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        timeline: resolve(__dirname, 'vaccine-timeline.html')
      }
    }
  }
})