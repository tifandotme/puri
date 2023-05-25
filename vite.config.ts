import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      injectRegister: "script",
      registerType: "autoUpdate",
      strategies: "generateSW",
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
      },
      includeAssets: ["favicon.ico", "logo.png", "404.gif", "background.webp"],
      manifest: {
        id: "com.puri",
        lang: "id-ID",
        name: "Puri: Order Management System",
        short_name: "Puri",
        description: "Order Management System",
        theme_color: "#FFFFFF",
        display: "standalone",
        scope: "/",
        start_url: "/",
        orientation: "portrait",
        icons: [
          {
            src: "pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
  root: "src",
  envDir: "../",
  build: {
    outDir: "../public",
  },
  server: {
    port: 3000,
  },
});
