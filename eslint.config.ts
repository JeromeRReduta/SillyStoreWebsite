import js from "@eslint/js";
import { defineConfig, globalIgnores } from "eslint/config";
import tseslint from "typescript-eslint";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";

export default defineConfig(
    js.configs.recommended,
    tseslint.configs.strictTypeChecked,
    tseslint.configs.stylisticTypeChecked,
    reactHooks.configs.flat.recommended,
    reactRefresh.configs.vite,

    {
        languageOptions: {
            parserOptions: {
                projectService: true,
            },
        },
    },
    globalIgnores(["SillyStoreCommon/"]),
);
