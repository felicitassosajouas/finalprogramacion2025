import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
<<<<<<< HEAD
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
})
=======

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})
>>>>>>> origin/master
