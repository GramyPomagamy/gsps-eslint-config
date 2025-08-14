import { ConfigCreator } from "./util/ConfigCreator.js";

const tsParser = ConfigCreator.createTsParser({
  tsconfigFilePaths: ["tsconfig.json"],
});

const browserRules = ConfigCreator.createBrowserRules({
  folderPath: "**",
});

const extensionRules = ConfigCreator.createNodeRules({
  folderPath: "**",
});

const testRules = ConfigCreator.createTestRules();

export const baseConfig = [
  ...tsParser,
  ...browserRules,
  ...extensionRules,
  ...testRules,
];
