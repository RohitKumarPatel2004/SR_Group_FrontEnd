import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Allows access from your LAN IP (e.g., 192.168.x.x)
    port: 5173       // Default port (you can change it if needed)
  }
});
