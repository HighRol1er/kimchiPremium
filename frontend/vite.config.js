import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { visualizer } from "rollup-plugin-visualizer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    visualizer({
      filename: "./dist/report.html",
      open: true,
      brotliSize: true,
    }),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          const module = id.split("node_modules/").pop().split("/")[0];
          if (id.includes("node_modules")) {
            return `vendor/${module}`;
          }
        },
      },
    }
  }
  
});