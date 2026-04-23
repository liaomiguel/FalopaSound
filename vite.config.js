import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'FAFA SOUND OS',
        short_name: 'FAFA SOUND',
        description: 'Futuristic Soundboard - Neural Interface OS',
        theme_color: '#030712',
        background_color: '#030712',
        display: 'standalone',
        icons: [
          {
            src: 'https://cdn-icons-png.flaticon.com/512/1164/1164620.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ]
});
