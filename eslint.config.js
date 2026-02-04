import js from "@eslint/js";
import tseslint from "typescript-eslint";
import reactPlugin from "eslint-plugin-react";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import stylistic from "@stylistic/eslint-plugin";
import vitest from "@vitest/eslint-plugin";
import globals from "globals";

export default tseslint.config(
    { ignores: ["dist", "node_modules", "coverage"] },
    js.configs.recommended,
    ...tseslint.configs.recommended,
    eslintPluginPrettierRecommended,
    {
        files: ["**/*.{ts,tsx,js}"],
        languageOptions: {
            globals: {
                ...globals.node,
                ...globals.browser,
            },
        },
        plugins: {
            react: reactPlugin,
            "@stylistic": stylistic,
        },
        rules: {
            ...reactPlugin.configs.recommended.rules,
            "react/react-in-jsx-scope": "off",
            "no-console": ["error", { allow: ["warn", "error"] }],
            "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
            "@stylistic/quotes": ["error", "double"],
            "@stylistic/padding-line-between-statements": [
                "error",
                { blankLine: "always", prev: "import", next: "*" },
                { blankLine: "any", prev: "import", next: "import" },
                { blankLine: "always", prev: ["const", "let", "var"], next: "*" },
                { blankLine: "any", prev: ["const", "let", "var"], next: ["const", "let", "var"] },
                { blankLine: "always", prev: "*", next: "return" },
            ],
        },
        settings: {
            react: {
                version: "detect",
            },
        },
    },
    {
        files: ["src/**/*.test.{ts,tsx}"],
        plugins: {
            vitest,
        },
        rules: {
            ...vitest.configs.recommended.rules,
            "vitest/no-focused-tests": "error",
        },
    },
);
