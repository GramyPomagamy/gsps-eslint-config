# @gramypomagamy/eslint-config

The ESLint config used in GramyPomagamy (GSPS) TypeScript projects.

## Install

Run:
```sh
npm i -D @gramypomagamy/eslint-config
```

Add a file called `eslint.config.js` to your project root, and add this code there:
```js
import config from '@gramypomagamy/eslint-config';

export default config;
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