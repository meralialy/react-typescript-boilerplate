import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        globals: true,
        environment: "jsdom",
        setupFiles: "./src/setup-tests.ts",
        coverage: {
            provider: "v8",
            reporter: ["text", "json", "html"],
            include: ["src/**/*"],
            exclude: [
                "src/**/*.test.tsx",
                "src/index.tsx",
                "src/setup-tests.ts",
                "src/locales/**",
                "**/node_modules/**",
                "**/*.css",
                "**/*.scss",
                "**/*.sass",
                "**/*.d.ts",
            ],
            thresholds: {
                lines: 100,
                functions: 100,
                branches: 100,
                statements: 100,
            },
        },
    },
});
