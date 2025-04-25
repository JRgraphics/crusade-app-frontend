import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { config } from "dotenv";

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "https://crusade-app-backend.vercel.app", // Backend server
        changeOrigin: true, // Ensure the request appears to come from the frontend server
        rewrite: (path) => path.replace(/^\/api/, ""), // Optional: Remove '/api' prefix
      },
    },
  },
  plugins: [react()],
  define: {
    "process.env.GOOGLE_CLIENT_ID": process.env.GOOGLE_CLIENT_ID,
  },
});
