import { ConfigCreator } from "./util/ConfigCreator.js";

const tsParser = ConfigCreator.createTsParser({
  tsconfigFilePaths: ["tsconfig.json"],
});

const reactRules = ConfigCreator.createReactRules({
  folderPath: "**",
});

const vueRules = ConfigCreator.createVueRules({
  folderPath: "**",
  tsconfigFilePaths: ["tsconfig.json"],
});

const tsRules = ConfigCreator.createTsRules({
  folderPath: "**",
});

const testRules = ConfigCreator.createTestRules();

export const tsConfig = [...tsParser, ...tsRules, ...testRules];
export const reactConfig = [...tsParser, ...reactRules, ...testRules];
export const vueConfig = [...vueRules, ...testRules];
