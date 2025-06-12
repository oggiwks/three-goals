import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import preferArrowFunctions from "eslint-plugin-prefer-arrow-functions";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    plugins: {
      "prefer-arrow-functions": preferArrowFunctions,
    },
    rules: {
      "prefer-arrow-functions/prefer-arrow-functions": [
        "error",
        {
          allowedNames: [],
          allowNamedFunctions: false,
          allowObjectProperties: true,
          classPropertiesAllowed: true,
          disallowPrototype: false,
          returnStyle: "implicit",
          singleReturnOnly: false,
        },
      ],
    },
  },
];

export default eslintConfig;
