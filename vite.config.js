import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Ensures assets are loaded from the root correctly
  base: '/', 
  build: {
    // Matches the "Output Directory" in Vercel settings
    outDir: 'dist', 
    // Ensures small assets aren't inlined as base64, which can sometimes cause issues
    assetsInlineLimit: 0, 
  },
})