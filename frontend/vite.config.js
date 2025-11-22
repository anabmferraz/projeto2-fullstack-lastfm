import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import compression from "vite-plugin-compression";
import fs from "fs"; // Módulo para ler arquivos

export default defineConfig({
  plugins: [react(), compression({ algorithm: "gzip" })],
  server: {
    port: 5173,
    // Configura o Frontend para rodar em HTTPS
    https: {
      key: fs.readFileSync("../backend/server.key"),
      cert: fs.readFileSync("../backend/server.cert"),
    },
    proxy: {
      "/api": {
        target: "https://localhost:5000",
        changeOrigin: true,
        secure: false,
      },
    },
  },
  build: {
    minify: "terser",
    cssMinify: true,
  },
});
