import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// const backendUrl = "http://localhost:5000";
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            "@": "/src",
            "@api": "/src/api",
            "@components": "/src/components",
            "@pages": "/src/pages",
        },
    },
    // server: {
    //   proxy: {
    //     '/api': {
    //       target: backendUrl,
    //       changeOrigin: true,
    //       rewrite: (path) => path.replace(/^\/api/, '')
    //     }
    //   }
    // }
});
