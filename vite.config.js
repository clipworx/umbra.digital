import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [{ find: "@", replacement: "/src" }],
  },
  server: {
    proxy: {
      "/api": {
        target: "http://bizzzydigital.site:3000", // Backend API
        changeOrigin: true,
        secure: false, // Required because backend is HTTP, not HTTPS
        rewrite: (path) => path.replace(/^\/api/, ""), // Remove "/api" from requests
      },
    },
  },
});
