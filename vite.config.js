import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import vercel from "vite-plugin-vercel";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return {
    server: {
      proxy: {
        "/api": {
          target: process.env.VITE_BACKEND_URL, // Backend server
          changeOrigin: true, // Ensure the request appears to come from the frontend server
          rewrite: (path) => path.replace(/^\/api/, ""), // Optional: Remove '/api' prefix
        },
      },
    },
    plugins: [react(), vercel()],
    define: {
      "process.env.GOOGLE_CLIENT_ID": process.env.GOOGLE_CLIENT_ID,
    },
  };
});
