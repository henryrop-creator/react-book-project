import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/react-book-project/', // 👈 Add this line
  plugins: [react()],
})

