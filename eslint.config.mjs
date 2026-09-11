import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  {
    // Force icon markup through <Icon>, which sets aria-hidden — a raw
    // ligature span leaks its name ("smart_display" etc.) to screen readers.
    rules: {
      "no-restricted-syntax": [
        "error",
        {
          selector: "Literal[value=/material-symbols-outlined/]",
          message: "Use <Icon name=\"...\" /> from '@/components/ui' instead of a raw material-symbols-outlined span.",
        },
        {
          selector: "TemplateElement[value.raw=/material-symbols-outlined/]",
          message: "Use <Icon name=\"...\" /> from '@/components/ui' instead of a raw material-symbols-outlined span.",
        },
      ],
    },
  },
  {
    files: ["src/components/ui/Icon.tsx", "eslint.config.mjs"],
    rules: {
      "no-restricted-syntax": "off",
    },
  },
]);

export default eslintConfig;
