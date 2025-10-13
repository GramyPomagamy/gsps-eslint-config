# @gramypomagamy/eslint-config

The ESLint config used in GramyPomagamy (GSPS) TypeScript projects.

## Install

Run:
```sh
npm i -D @gramypomagamy/eslint-config
```

### Base config
The base config is suitable for most projects with a single `tsconfig.json` file.

Add a file called `eslint.config.mjs` to your project root, and add this code there:
```js
import { baseConfig } from '@gramypomagamy/eslint-config';

export default baseConfig;
```

### Config creator (mostly used for NodeCG projects)
The config creator allows you to create specific rules with custom paths to the files that would be linted and a custom path to a `tsconfig.json` file.

Example usage:
```js
import { ConfigCreator } from "@gramypomagamy/eslint-config";

const tsParser = ConfigCreator.createTsParser({
  tsconfigFilePaths: [
    "src/browser/tsconfig.json",
    "src/extension/tsconfig.json",
  ],
});

const browserConfig = ConfigCreator.createBrowserRules({
  folderPath: "src/browser",
});

const browserTsConfig = ConfigCreator.createNodeRules({
  folderPath: "src/browser",
});

const extensionConfig = ConfigCreator.createNodeRules({
  folderPath: "src/extension",
});

export default [
  ...tsParser,
  ...browserConfig,
  ...browserTsConfig,
  ...extensionConfig,
];
```

## IDE Setup

### Visual Studio Code

Install the [ESLint Extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint), then press `Ctrl+Shift+P` (`Cmd+Shift+P` on macOS), open `Preferences: Open User Settings (JSON)` and add this to the file:

```json
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  }
```

This enable fix on save in VSCode for ESLint.

### JetBrains WebStorm

ESLint is enabled by default in WebStorm, the only recommended tweak is enabling ["fix on save" in ESLint settings](https://www.jetbrains.com/help/webstorm/eslint.html#ws_eslint_configure_run_eslint_on_save).

### Zed

ESLint is installed by default in Zed. Add this snippet to your config:
```json
  "format_on_save": "on",
  "formatter": [
    {
      "code_actions": {
        "source.fixAll.eslint": true
      }
    }
  ]
```
to enable format on save for ESLint.

More info here: https://zed.dev/docs/configuring-zed#format-on-save
