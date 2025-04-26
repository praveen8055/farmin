import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { sentryVitePlugin } from "@sentry/vite-plugin"

export default defineConfig({
  plugins: [
    react(),
   
  ],
  build: {
    outDir: 'build', // Change output from 'dist' to 'build'
  },
})
