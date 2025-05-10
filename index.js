const eslintJs = require('@eslint/js');
const tseslint = require('typescript-eslint');
const perfectionist = require('eslint-plugin-perfectionist');
const reactHooks = require('eslint-plugin-react-hooks');
const react = require('eslint-plugin-react');
const globals = require('globals');
const stylistic = require('@stylistic/eslint-plugin');

module.exports = tseslint.config(
    // Base ignores
    {
        ignores: [
            "node_modules",
            ".gitignore",
            "dist",
            "build",
            "coverage",
            ".next",
            "*.min.js"
        ]
    },
    eslintJs.configs.recommended,
    ...tseslint.configs.recommended,
    ...react.configs.flat.recommended,
    ...react.configs.flat['jsx-runtime'],
    ...reactHooks.configs['recommended-latest'],
    // Base config for all files
    {
        files: ['**/*.{js,jsx,mjs,cjs,ts,tsx}'],
        plugins: {
            '@typescript-eslint': tseslint.plugin,
            perfectionist,
            react,
            '@stylistic': stylistic
        },
        languageOptions: {
            // No browser globals by default
            parser: tseslint.parser,
            parserOptions: {
                ecmaFeatures: {
                    jsx: true
                },
                project: './tsconfig.json', // Enable type-aware rules
                ecmaVersion: 'latest',
                sourceType: 'module'
            }
        },
        settings: {
            react: {
                version: 'detect' // React version detection
            },
            'import/resolver': {
                typescript: {} // Use TypeScript resolver
            }
        },
        rules: {
            // eslint
            "no-duplicate-imports": "error",
            "no-use-before-define": "off",
            "curly": "error",
            "default-case": "error",
            "dot-notation": "error",
            "no-empty-function": "off",
            "no-unneeded-ternary": "error",
            "no-useless-concat": "warn",
            "no-useless-constructor": "off",
            "no-var": "warn",
            "prefer-const": "error",
            "yoda": "error",
            "eqeqeq": ["error", "always", { "null": "ignore" }],

            // eslint-stylistic
            '@stylistic/newline-per-chained-call': 'error',
            "@stylistic/semi": "error",
            "@stylistic/jsx/jsx-quotes": ["error", "prefer-double"],
            "@stylistic/jsx/jsx-indent-props": ["error", 2],
            "@stylistic/jsx/jsx-self-closing-comp": ["error", {
                "component": true,
                "html": true
            }],
            "@stylistic/jsx/jsx-pascal-case": ["error", { "allowNamespace": true }],
            "@stylistic/jsx/jsx-closing-tag-location": "error",
            "@stylistic/jsx/jsx-curly-spacing": ["error", { "when": "never" }],
            "@stylistic/jsx/jsx-boolean-value": ["error", "never"],
            "@stylistic/jsx/jsx-first-prop-new-line": ["error", "multiline"],
            "@stylistic/indent": ["error", 2],
            "@stylistic/brace-style": ["error", "1tbs"],
            "@stylistic/array-bracket-newline": ["error", "consistent"],
            "@stylistic/object-curly-spacing": ["error", "always"],
            "@stylistic/quotes": ["error", "double", { "avoidEscape": true }],
            "@stylistic/max-len": ["warn", { "code": 100, "ignoreStrings": true, "ignoreTemplateLiterals": true, "ignoreComments": true }], // Reasonable line length

            // typescript-eslint
            "@typescript-eslint/prefer-nullish-coalescing": ["warn", { "ignoreIfStatements": true }],
            "@typescript-eslint/prefer-for-of": "warn",
            "@typescript-eslint/prefer-includes": "warn",
            "@typescript-eslint/prefer-find": "error",
            "@typescript-eslint/no-explicit-any": "warn",
            "@typescript-eslint/explicit-function-return-type": ["warn", { "allowExpressions": true }],
            "@typescript-eslint/ban-ts-comment": "warn",
            "@typescript-eslint/no-unused-vars": ["error", { "argsIgnorePattern": "^_", "varsIgnorePattern": "^_" }],
            "@typescript-eslint/consistent-type-imports": ["error", { "prefer": "type-imports" }],
            "@typescript-eslint/no-floating-promises": "error",
            "@typescript-eslint/no-misused-promises": "error",
            "@typescript-eslint/naming-convention": [
                "error",
                {
                    "selector": "interface",
                    "format": ["PascalCase"],
                    "prefix": ["I"]
                },
                {
                    "selector": "typeAlias",
                    "format": ["PascalCase"]
                },
                {
                    "selector": "enum",
                    "format": ["PascalCase"]
                }
            ],
            "@typescript-eslint/no-empty-function": "error",
            "@typescript-eslint/no-useless-constructor": "error",
            "@typescript-eslint/no-use-before-define": "error",

            // react rules
            "react/prop-types": "off",
            "react/display-name": "off",
            "react/jsx-curly-brace-presence": ["error", { "props": "never", "children": "never" }],
            "react/jsx-no-useless-fragment": "error",
            "react/jsx-handler-names": ["warn", {
                "eventHandlerPrefix": "handle",
                "eventHandlerPropPrefix": "on"
            }],
            "react/no-array-index-key": "warn",

            // perfectionist
            'perfectionist/sort-imports': ["error", { 
                type: 'natural', 
                order: 'asc',
                groups: [
                    'react',
                    'builtin',
                    'external',
                    'internal',
                    'parent',
                    'sibling',
                    'index',
                    'object',
                    'type',
                    'style',
                    'unknown'
                ]
            }],
            'perfectionist/sort-exports': ["error", { type: 'natural', order: 'asc' }],
            'perfectionist/sort-named-imports': ["error", { type: 'natural', order: 'asc' }],
            'perfectionist/sort-object-types': ["warn", { type: 'natural', order: 'asc' }]
        }
    },
    // Browser globals only for JSX/TSX files
    {
        files: ['**/*.{jsx,tsx}'],
        languageOptions: {
            globals: {
                ...globals.browser
            }
        }
    },
    // Test files
    {
        files: ['**/*.{test,spec}.{js,jsx,ts,tsx}', '**/tests/**', '**/test/**', '**/__tests__/**'],
        languageOptions: {
            globals: {
                ...globals.jest
            }
        },
        rules: {
            // Relaxed rules for test files
            "@typescript-eslint/no-explicit-any": "off",
            "@stylistic/max-len": "off",
            "@typescript-eslint/no-non-null-assertion": "off"
        }
    }
)