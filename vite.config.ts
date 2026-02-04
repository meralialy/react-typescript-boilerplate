import { defineConfig, loadEnv } from "vite";
import { createHtmlPlugin } from "vite-plugin-html";
import react from "@vitejs/plugin-react";
import pkg from "./package.json" assert { type: "json" };

const title = pkg.name
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

export default defineConfig(({ command, mode }) => {
    const env = loadEnv(mode, process.cwd(), "");
    const isProduction = command === "build";

    return {
        plugins: [
            react(),
            createHtmlPlugin({
                inject: {
                    data: {
                        title,
                    },
                },
            }),
        ],

        build: {
            minify: isProduction ? "esbuild" : false,
            sourcemap: !isProduction,
        },

        server: {
            port: Number(env.PORT),
            host: env.HOST,
        },
    };
});
