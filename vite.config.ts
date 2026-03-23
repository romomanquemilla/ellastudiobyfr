import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig({
  base: '/my-app/',  // ← Cambia "my-app" por el nombre exacto de tu repositorio en GitHub
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
