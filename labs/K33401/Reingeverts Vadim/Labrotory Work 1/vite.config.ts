import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
    // root: resolve(__dirname, "./"),
    // base: "/",
    resolve: {
        alias: {
            "~": resolve(__dirname, "./src"),
        },
    },
    define: {
        __dirname: JSON.stringify(__dirname),
    },
});
