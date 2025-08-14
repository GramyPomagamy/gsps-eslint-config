import eslintJs from "@eslint/js";
import * as tseslint from "typescript-eslint";
import perfectionist from "eslint-plugin-perfectionist";
import * as reactHooks from "eslint-plugin-react-hooks";
import react from "eslint-plugin-react";
import globals from "globals";
import stylistic from "@stylistic/eslint-plugin";
import type { LintingRulesParams } from "../types/rulesParams.types.js";

export class ConfigCreator {
  private static createTsParser({
    folderPath,
    tsconfigFilePath,
  }: LintingRulesParams) {
    return tseslint.config({
      files: [`${folderPath}/**/*.{ts,tsx}`],
      languageOptions: {
        parser: tseslint.parser,
        parserOptions: {
          ecmaFeatures: { jsx: true },
          project: tsconfigFilePath,
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

  public static createNodeRules({
    folderPath,
    tsconfigFilePath,
  }: LintingRulesParams) {
    return tseslint.config(
      this.createTsParser({ folderPath, tsconfigFilePath }),
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
      ...tseslint.configs.recommended,

      {
        files: [`${folderPath}/**/*.{js,mjs,cjs,ts}`],
        plugins: {
          perfectionist,
          "@stylistic": stylistic,
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

          // eslint-stylistic
          "@stylistic/newline-per-chained-call": "error",
          "@stylistic/semi": "error",
          "@stylistic/eol-last": "error",
          "@stylistic/indent": ["error", 2],
          "@stylistic/brace-style": ["error", "1tbs"],
          "@stylistic/array-bracket-newline": ["error", "consistent"],
          "@stylistic/object-curly-spacing": ["error", "always"],
          "@stylistic/quotes": ["error", "double", { avoidEscape: true }],
          "@stylistic/max-len": [
            "warn",
            {
              code: 100,
              ignoreStrings: true,
              ignoreTemplateLiterals: true,
              ignoreComments: true,
            },
          ],
          "@stylistic/no-trailing-spaces": "error",
          "@stylistic/no-multi-spaces": "error",
          "@stylistic/no-multiple-empty-lines": [
            "error",
            { max: 1, maxEOF: 0 },
          ],

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
        },
      },

      {
        files: [`${folderPath}/**/*.{ts}`],
        plugins: {
          "@typescript-eslint": tseslint.plugin,
        },
        settings: {
          "import/resolver": {
            typescript: {},
          },
        },
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
          "@typescript-eslint/explicit-function-return-type": [
            "warn",
            { allowExpressions: true },
          ],
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
              prefix: ["I"],
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
      }
    );
  }

  public static createBrowserRules({
    folderPath,
    tsconfigFilePath,
  }: LintingRulesParams) {
    return tseslint.config(
      this.createTsParser({ folderPath, tsconfigFilePath }),
      ...tseslint.configs.recommended,
      {
        files: [`${folderPath}/**/*.{jsx,tsx}`],
        extends: [
          react.configs.flat.recommended,
          react.configs.flat["jsx-runtime"],
          reactHooks.configs["recommended-latest"],
        ],
        plugins: {
          react,
          perfectionist,
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

          // eslint-stylistic
          "@stylistic/newline-per-chained-call": "error",
          "@stylistic/semi": "error",
          "@stylistic/eol-last": "error",
          "@stylistic/indent": ["error", 2],
          "@stylistic/brace-style": ["error", "1tbs"],
          "@stylistic/array-bracket-newline": ["error", "consistent"],
          "@stylistic/object-curly-spacing": ["error", "always"],
          "@stylistic/quotes": ["error", "double", { avoidEscape: true }],
          "@stylistic/max-len": [
            "warn",
            {
              code: 100,
              ignoreStrings: true,
              ignoreTemplateLiterals: true,
              ignoreComments: true,
            },
          ],
          "@stylistic/no-trailing-spaces": "error",
          "@stylistic/no-multi-spaces": "error",
          "@stylistic/no-multiple-empty-lines": [
            "error",
            { max: 1, maxEOF: 0 },
          ],

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
          "@stylistic/jsx-quotes": ["error", "prefer-double"],
          "@stylistic/jsx-indent-props": ["error", 2],
          "@stylistic/jsx-self-closing-comp": [
            "error",
            {
              component: true,
              html: true,
            },
          ],
          "@stylistic/jsx-pascal-case": ["error", { allowNamespace: true }],
          "@stylistic/jsx-closing-tag-location": "error",
          "@stylistic/jsx-curly-spacing": ["error", { when: "never" }],
          "@stylistic/jsx-first-prop-new-line": ["error", "multiline"],
          "@stylistic/jsx-curly-brace-presence": [
            "error",
            {
              props: "never",
              children: "never",
              propElementValues: "always",
            },
          ],
        },
      },

      {
        files: [`${folderPath}/**/*.{tsx}`],
        plugins: {
          "@typescript-eslint": tseslint.plugin,
        },
        settings: {
          "import/resolver": {
            typescript: {},
          },
        },
        rules: {
          "@typescript-eslint/prefer-nullish-coalescing": [
            "warn",
            { ignoreIfStatements: true },
          ],
          "@typescript-eslint/prefer-for-of": "warn",
          "@typescript-eslint/prefer-includes": "warn",
          "@typescript-eslint/prefer-find": "error",
          "@typescript-eslint/no-explicit-any": "warn",
          "@typescript-eslint/explicit-function-return-type": [
            "warn",
            { allowExpressions: true },
          ],
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
              prefix: ["I"],
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
      }
    );
  }

  public static createTestRules() {
    return tseslint.config({
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
    });
  }
}
