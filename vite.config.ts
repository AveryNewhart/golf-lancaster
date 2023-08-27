import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/golf-lancaster/',
  plugins: [vue()],
  build: {
    assetsDir: 'assets', // This specifies the directory for assets (like images)
    // ... other build options
  },
});

