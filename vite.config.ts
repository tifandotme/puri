import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  root: "src",
  envDir: "../",
  build: {
    outDir: "../public",
  },
  server: {
    port: 3000,
  },
});
