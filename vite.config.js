import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // Ensure this is here

export default defineConfig({
  plugins: [
    tailwindcss(), // Put this BEFORE react()
    react(),
  ],
})