import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from "path";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        entryFileNames: 'org-chart.js',
        assetFileNames: 'org-chart.css',
      },
    },
  },
})
