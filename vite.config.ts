import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import requireTransform from "vite-plugin-require-transform";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    requireTransform({ fileRegex: /^(?!.*node_modules).*\.(js|jsx|ts|tsx)$/ }),
  ],
  server: {
    port: 5174,
  },
  resolve: {
    alias: {
      "@/views":path.resolve(__dirname, "./src/views"),
      "@c": path.resolve(__dirname, "./src/components"),
    },
  },
});
