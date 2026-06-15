import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Custom domain (syu.dreamitbiz.com) → base must be '/'
export default defineConfig({
  base: '/',
  plugins: [react()],
})
