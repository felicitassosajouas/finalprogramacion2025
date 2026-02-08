import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [
    react(),
  ],
  optimizeDeps: {
    include: ['swiper', 'swiper/css', 'swiper/css/pagination', 'swiper/css/navigation']
  }
})