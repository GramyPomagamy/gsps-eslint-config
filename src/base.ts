import { ConfigCreator } from "./util/ConfigCreator.js";

const browserRules = ConfigCreator.createBrowserRules({
  folderPath: "**",
  tsconfigFilePath: "./tsconfig.json",
});
const extensionRules = ConfigCreator.createNodeRules({
  folderPath: "**",
  tsconfigFilePath: "./tsconfig.json",
});
const testRules = ConfigCreator.createTestRules();

export const baseConfig = [...browserRules, ...extensionRules, ...testRules];
