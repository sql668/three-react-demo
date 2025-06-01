import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import requireTransform from "vite-plugin-require-transform";

const demoPlugin = (options:any) => {
  return {
    name: "vite-raw-plugin",
    transform(code:any, id:string) {
      if (options.fileRegex.test(id)) {
        const json = JSON.stringify(code)
          .replace(/\u2028/g, "\\u2028")
          .replace(/\u2029/g, "\\u2029");

        return {
          code: `export default ${json}`,
        };
      }
    },
  };
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // demoPlugin({
    //   fileRegex: /\.tsx$/,
    // }),
    requireTransform({ fileRegex: /^(?!.*node_modules).*\.(js|jsx|ts|tsx)$/ }),
  ],
  server: {
    port: 5174,
  },
  resolve: {
    alias: {
      "@/views": path.resolve(__dirname, "./src/views"),
      "@c": path.resolve(__dirname, "./src/components"),
      "@": path.resolve(__dirname, "./src/"),
    },
  },
});
