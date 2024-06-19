import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import requireTransform from "vite-plugin-require-transform";

//console.log("路径地址1:",path.resolve(__dirname, '../packages/antd/src/index.tsx'));
//console.log("路径地址2:",path.resolve(__dirname, './src/components/*'));
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
