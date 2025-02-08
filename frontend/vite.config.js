import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: process.env.PORT || 3000, // Usa el puerto proporcionado por Render, si está disponible
    host: '0.0.0.0', // Asegura que Vite escuche en todas las interfaces de red
  },
  preview: {
    allowedHosts: ['sistemagaleriafotos.onrender.com'], // Agrega tu dominio de Render aquí
  },
});
