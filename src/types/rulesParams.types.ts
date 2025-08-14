export type LintingRulesParams = {
  /** Path to the folder this ruleset should work with, supports glob format. */
  folderPath: string;
};

export type TsParserParams = {
  /** Array of tsconfig.json files to use when creating the TypeScript parser. */
  tsconfigFilePaths: string[]
}
