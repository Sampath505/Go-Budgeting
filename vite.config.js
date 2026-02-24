import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // This processes the @import "tailwindcss"
  ],
  base: '/Go-Budgeting/', 
})