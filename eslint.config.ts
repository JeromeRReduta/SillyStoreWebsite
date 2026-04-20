import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
    {
        files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
        plugins: {
            js,
        },
        extends: ["js/recommended"],

        languageOptions: {
            parserOptions: {
                projectService: true,
                tsconfigRootDir: import.meta.dirname,
                allowDefaultProject: ["eslint.config.ts"],
            },
        },
        rules: {
            "import-x/no-dynamic-require": "error",
            "import-x/no-nodejs-modules": "error",
            "import-x/extensions": ["error", "always"],
        },
    },

    tseslint.configs.strictTypeChecked,
    tseslint.configs.stylisticTypeChecked,
    reactHooks.configs.flat.recommended,
    reactRefresh.configs.vite,
    globalIgnores(["dist"]),
]);
