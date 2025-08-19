import { defineConfig } from "tsup";

export default defineConfig([
  {
    entry: {
      index: "src/index.ts",
    },
    format: ["cjs", "esm"],
    target: "node16",
    splitting: false,
    sourcemap: false,
    clean: true,
    minify: true,
    dts: true,
    outDir: "dist",
  },
]);