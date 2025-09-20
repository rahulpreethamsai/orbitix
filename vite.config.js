import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
  // This is the section you need to add to create the '@' alias.
  // It tells Vite that whenever it sees '@', it should look inside the 'src' folder.
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
