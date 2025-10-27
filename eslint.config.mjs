import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import testingLibrary from "eslint-plugin-testing-library";
import jestDom from "eslint-plugin-jest-dom";
import { test } from "vitest";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    files: ["**/*.test.{ts, tsx}"],
    plugins: {testingLibrary, jestDom},
    rules: {
      ...jestDom.configs["flat/recommended"].rules,
      ...testingLibrary.configs["flat/react"].rules,
      ...testingLibrary.configs["flat/dom"].rules,
    }
  }
];

export default eslintConfig;
