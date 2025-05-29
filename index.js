import eslintJs from "@eslint/js";
import * as tseslint from "typescript-eslint";
import perfectionist from "eslint-plugin-perfectionist";
import * as reactHooks from "eslint-plugin-react-hooks";
import react from "eslint-plugin-react";
import globals from "globals";
import stylistic from "@stylistic/eslint-plugin";

export default tseslint.config(
  // Base ignores
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
  react.configs.flat.recommended,
  react.configs.flat["jsx-runtime"],
  reactHooks.configs["recommended-latest"],

  // Base config for all files
  {
    files: ["src/**/*.{js,jsx,mjs,cjs,ts,tsx}"],
    plugins: {
      "@typescript-eslint": tseslint.plugin,
      perfectionist,
      "@stylistic": stylistic,
    },
    languageOptions: {
      // No browser globals by default
      parser: tseslint.parser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        project: "./tsconfig.json", // Enable type-aware rules
        ecmaVersion: 2022,
        sourceType: "module",
      },
    },
    settings: {
      "import/resolver": {
        typescript: {}, // Use TypeScript resolver
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
      "@stylistic/no-multiple-empty-lines": ["error", { max: 1, maxEOF: 0 }],

      // typescript-eslint
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
        { prefer: "type-imports" },
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

      // perfectionist
      "perfectionist/sort-imports": [
        "error",
        {
          type: "natural",
          order: "asc",
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

  // Rules only for JSX/TSX files
  {
    files: ["**/*.{jsx,tsx}"],
    plugins: {
      react,
      "@stylistic": stylistic,
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
    rules: {
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
      "@stylistic/jsx-boolean-value": ["error", "never"],
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

  // Test files
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
  }
);
