import eslintJs from "@eslint/js";
import * as tseslint from "typescript-eslint";
import perfectionist from "eslint-plugin-perfectionist";
import * as reactHooks from "eslint-plugin-react-hooks";
import prettier from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";
import react from "eslint-plugin-react";
import vue from "eslint-plugin-vue";
import vueParser from "vue-eslint-parser";
import globals from "globals";
import stylistic from "@stylistic/eslint-plugin";
import type {
  LintingRulesParams,
  TsParserParams,
} from "../types/rulesParams.types.js";

export class ConfigCreator {
  public static createTsParser({ tsconfigFilePaths }: TsParserParams) {
    return tseslint.config({
      files: ["**/**/*.{ts,tsx}"],
      languageOptions: {
        parser: tseslint.parser,
        parserOptions: {
          ecmaFeatures: { jsx: true },
          project: tsconfigFilePaths,
          ecmaVersion: 2022,
          sourceType: "module",
        },
        globals: {
          ...globals.browser,
          ...globals.node,
          ...globals.es2021,
        },
      },
    });
  }

  public static createTsRules({ folderPath }: LintingRulesParams) {
    return tseslint.config(
      {
        ignores: [
          "node_modules",
          ".gitignore",
          "dist",
          "build",
          "coverage",
          ".next",
          "*.min.js",
        ],
      },

      eslintJs.configs.recommended,

      {
        name: "javascript-rules",
        files: [`${folderPath}/**/*.{js,mjs,cjs,ts}`],
        plugins: {
          perfectionist,
          prettier,
        },
        languageOptions: {
          globals: {
            ...globals.browser,
            ...globals.node,
            ...globals.es2021,
          },
        },
        rules: {
          // eslint
          "no-duplicate-imports": "error",
          "no-use-before-define": "off",
          curly: "error",
          "default-case": "error",
          "dot-notation": "error",
          "no-empty-function": "off",
          "no-unneeded-ternary": "error",
          "no-useless-concat": "warn",
          "no-useless-constructor": "off",
          "no-var": "warn",
          "prefer-const": "error",
          yoda: "error",
          eqeqeq: ["error", "smart"],

          // perfectionist
          "perfectionist/sort-imports": [
            "error",
            {
              type: "natural",
              order: "asc",
              newlinesBetween: "never",
              groups: [
                ["builtin-type", "builtin"],
                ["external-type", "external"],
                ["internal-type", "internal"],
                ["parent-type", "parent"],
                ["sibling-type", "sibling"],
                ["index-type", "index"],
                "object",
                "unknown",
              ],
            },
          ],
          "perfectionist/sort-exports": [
            "error",
            { type: "natural", order: "asc" },
          ],
          "perfectionist/sort-named-imports": [
            "error",
            { type: "natural", order: "asc" },
          ],
          "perfectionist/sort-object-types": [
            "warn",
            { type: "natural", order: "asc" },
          ],

          // prettier
          "prettier/prettier": "error",
        },
      },

      {
        name: "typescript-rules",
        files: [`${folderPath}/**/*.ts`],
        plugins: {
          "@typescript-eslint": tseslint.plugin,
        },
        settings: {
          "import/resolver": {
            typescript: {},
          },
        },
        extends: [tseslint.configs.recommended],
        rules: {
          "dot-notation": "off",
          "@typescript-eslint/dot-notation": "error",
          "@typescript-eslint/prefer-nullish-coalescing": [
            "warn",
            { ignoreIfStatements: true },
          ],
          "@typescript-eslint/prefer-for-of": "warn",
          "@typescript-eslint/prefer-includes": "warn",
          "@typescript-eslint/prefer-find": "error",
          "@typescript-eslint/no-explicit-any": "warn",
          "@typescript-eslint/ban-ts-comment": "warn",
          "@typescript-eslint/no-unused-vars": [
            "error",
            { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
          ],
          "@typescript-eslint/consistent-type-imports": [
            "error",
            {
              prefer: "type-imports",
              fixStyle: "inline-type-imports",
            },
          ],
          "@typescript-eslint/no-floating-promises": "error",
          "@typescript-eslint/no-misused-promises": "error",
          "@typescript-eslint/naming-convention": [
            "error",
            {
              selector: "interface",
              format: ["PascalCase"],
            },
            {
              selector: "typeAlias",
              format: ["PascalCase"],
            },
            {
              selector: "enum",
              format: ["PascalCase"],
            },
          ],
          "@typescript-eslint/no-empty-function": "error",
          "@typescript-eslint/no-useless-constructor": "error",
          "@typescript-eslint/no-use-before-define": "error",
          "@typescript-eslint/no-require-imports": "off",
        },
      },

      prettierConfig,
    );
  }

  public static createReactRules({ folderPath }: LintingRulesParams) {
    return tseslint.config(
      {
        ignores: [
          "node_modules",
          ".gitignore",
          "dist",
          "build",
          "coverage",
          ".next",
          "*.min.js",
        ],
      },
      {
        name: "react-rules",
        files: [`${folderPath}/**/*.{jsx,tsx}`],
        extends: [
          react.configs.flat.recommended,
          react.configs.flat["jsx-runtime"],
          reactHooks.configs["recommended-latest"],
        ],
        plugins: {
          react,
          perfectionist,
          prettier,
          "@stylistic": stylistic,
        },
        settings: {
          react: {
            version: "detect",
          },
        },
        languageOptions: {
          globals: {
            ...globals.node,
            ...globals.es2021,
            ...globals.browser,
          },
        },
        rules: {
          "no-duplicate-imports": "error",
          "no-use-before-define": "off",
          "default-case": "error",
          "dot-notation": "error",
          "no-empty-function": "off",
          "no-unneeded-ternary": "error",
          "no-useless-concat": "warn",
          "no-useless-constructor": "off",
          "no-var": "warn",
          "prefer-const": "error",
          yoda: "error",
          eqeqeq: ["error", "smart"],

          // perfectionist
          "perfectionist/sort-imports": [
            "error",
            {
              type: "natural",
              order: "asc",
              newlinesBetween: "never",
              groups: [
                ["builtin-type", "builtin"],
                ["external-type", "external"],
                ["internal-type", "internal"],
                ["parent-type", "parent"],
                ["sibling-type", "sibling"],
                ["index-type", "index"],
                "object",
                "unknown",
              ],
            },
          ],
          "perfectionist/sort-exports": [
            "error",
            { type: "natural", order: "asc" },
          ],
          "perfectionist/sort-named-imports": [
            "error",
            { type: "natural", order: "asc" },
          ],
          "perfectionist/sort-object-types": [
            "warn",
            { type: "natural", order: "asc" },
          ],

          // react rules
          "react/prop-types": "off",
          "react/display-name": "off",
          "react/jsx-no-useless-fragment": "error",
          "react/jsx-handler-names": [
            "warn",
            {
              eventHandlerPrefix: "handle",
              eventHandlerPropPrefix: "on",
            },
          ],
          "react/no-array-index-key": "warn",
          "react/jsx-boolean-value": ["error", "never"],

          // JSX stylistic
          "@stylistic/jsx-self-closing-comp": [
            "error",
            {
              component: true,
              html: true,
            },
          ],
          "@stylistic/jsx-pascal-case": ["error", { allowNamespace: true }],
          "@stylistic/jsx-curly-brace-presence": [
            "error",
            {
              props: "never",
              children: "never",
              propElementValues: "always",
            },
          ],

          // prettier
          "prettier/prettier": "error",
        },
      },

      {
        name: "react-rules-typescript",
        files: [`${folderPath}/**/*.tsx`],
        plugins: {
          "@typescript-eslint": tseslint.plugin,
        },
        settings: {
          "import/resolver": {
            typescript: {},
          },
        },
        extends: [tseslint.configs.recommended],
        rules: {
          "@typescript-eslint/prefer-nullish-coalescing": [
            "warn",
            { ignoreIfStatements: true },
          ],
          "@typescript-eslint/prefer-for-of": "warn",
          "@typescript-eslint/prefer-includes": "warn",
          "@typescript-eslint/prefer-find": "error",
          "@typescript-eslint/no-explicit-any": "warn",
          "@typescript-eslint/ban-ts-comment": "warn",
          "@typescript-eslint/no-unused-vars": [
            "error",
            { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
          ],
          "@typescript-eslint/consistent-type-imports": [
            "error",
            {
              prefer: "type-imports",
              fixStyle: "inline-type-imports",
            },
          ],
          "@typescript-eslint/no-floating-promises": "error",
          "@typescript-eslint/no-misused-promises": "error",
          "@typescript-eslint/naming-convention": [
            "error",
            {
              selector: "interface",
              format: ["PascalCase"],
            },
            {
              selector: "typeAlias",
              format: ["PascalCase"],
            },
            {
              selector: "enum",
              format: ["PascalCase"],
            },
          ],
          "@typescript-eslint/no-empty-function": "error",
          "@typescript-eslint/no-useless-constructor": "error",
          "@typescript-eslint/no-use-before-define": "error",
          "@typescript-eslint/no-require-imports": "off",
        },
      },

      prettierConfig,
    );
  }

  public static createVueRules({
    folderPath,
    tsconfigFilePaths,
  }: LintingRulesParams & TsParserParams) {
    return tseslint.config(
      {
        ignores: [
          "node_modules",
          ".gitignore",
          "dist",
          "build",
          "coverage",
          ".next",
          "*.min.js",
        ],
      },
      {
        name: "vue-rules",
        files: [`${folderPath}/**/*.vue`],
        extends: [
          vue.configs["flat/recommended"],
          tseslint.configs.recommended,
        ],
        plugins: {
          vue,
          prettier,
          perfectionist,
          "@typescript-eslint": tseslint.plugin,
        },
        settings: {
          "import/resolver": {
            typescript: {},
          },
        },
        languageOptions: {
          parser: vueParser,
          parserOptions: {
            parser: tseslint.parser,
            project: tsconfigFilePaths,
            extraFileExtensions: [".vue"],
          },
          globals: {
            ...globals.node,
            ...globals.es2021,
            ...globals.browser,
          },
        },
        rules: {
          // vue
          "vue/multi-word-component-names": "off",

          // perfectionist
          "perfectionist/sort-imports": [
            "error",
            {
              type: "natural",
              order: "asc",
              newlinesBetween: "never",
              groups: [
                ["builtin-type", "builtin"],
                ["external-type", "external"],
                ["internal-type", "internal"],
                ["parent-type", "parent"],
                ["sibling-type", "sibling"],
                ["index-type", "index"],
                "object",
                "unknown",
              ],
            },
          ],
          "perfectionist/sort-exports": [
            "error",
            { type: "natural", order: "asc" },
          ],
          "perfectionist/sort-named-imports": [
            "error",
            { type: "natural", order: "asc" },
          ],
          "perfectionist/sort-object-types": [
            "warn",
            { type: "natural", order: "asc" },
          ],

          // typescript-eslint
          "@typescript-eslint/prefer-nullish-coalescing": [
            "warn",
            { ignoreIfStatements: true },
          ],
          "@typescript-eslint/prefer-for-of": "warn",
          "@typescript-eslint/prefer-includes": "warn",
          "@typescript-eslint/prefer-find": "error",
          "@typescript-eslint/no-explicit-any": "warn",
          "@typescript-eslint/ban-ts-comment": "warn",
          "@typescript-eslint/no-unused-vars": [
            "error",
            { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
          ],
          "@typescript-eslint/consistent-type-imports": [
            "error",
            {
              prefer: "type-imports",
              fixStyle: "inline-type-imports",
            },
          ],
          "@typescript-eslint/no-floating-promises": "error",
          "@typescript-eslint/no-misused-promises": "error",
          "@typescript-eslint/naming-convention": [
            "error",
            {
              selector: "interface",
              format: ["PascalCase"],
            },
            {
              selector: "typeAlias",
              format: ["PascalCase"],
            },
            {
              selector: "enum",
              format: ["PascalCase"],
            },
          ],
          "@typescript-eslint/no-empty-function": "error",
          "@typescript-eslint/no-useless-constructor": "error",
          "@typescript-eslint/no-use-before-define": "error",
          "@typescript-eslint/no-require-imports": "off",

          // prettier
          "prettier/prettier": "error",
        },
      },
      prettierConfig,
    );
  }

  public static createTestRules() {
    return tseslint.config(
      {
        files: [
          "**/*.{test,spec}.{js,jsx,ts,tsx}",
          "**/tests/**",
          "**/test/**",
          "**/__tests__/**",
        ],
        languageOptions: {
          globals: {
            ...globals.jest,
          },
        },
        rules: {
          // Relaxed rules for test files
          "@typescript-eslint/no-explicit-any": "off",
          "@stylistic/max-len": "off",
          "@typescript-eslint/no-non-null-assertion": "off",
        },
      },
      prettierConfig,
    );
  }
}
