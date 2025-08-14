export type LintingRulesParams = {
  /** Path to the tsconfig.json file this ruleset should use. */
  tsconfigFilePath: string;
  /** Path to the folder this ruleset should work with, supports glob format. */
  folderPath: string;
};
