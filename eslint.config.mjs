import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

// 플러그인 import
import pluginReact from "eslint-plugin-react";
import pluginReactHooks from "eslint-plugin-react-hooks";
import pluginImport from "eslint-plugin-import";
import tseslint from "@typescript-eslint/eslint-plugin";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  {
    plugins: {
      react: pluginReact,
      "react-hooks": pluginReactHooks,
      import: pluginImport,
      "@typescript-eslint": tseslint,
    },
    rules: {
      // ❌ 디버깅 코드 방지
      "no-console": "warn",
      "no-debugger": "error",

      // 🧹 사용하지 않는 변수 제거
      "no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],

      // ⚠️ 선언 전에 사용하는 것 방지
      "no-use-before-define": ["error", { functions: false, classes: true }],

      // ✅ 함수/변수 일관된 선언 방식 유지
      "prefer-const": "error",
      "no-var": "error",

      // ✅ 리액트 훅 규칙
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",

      // 📦 import 순서 정렬
      "import/order": [
        "warn",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
          ],
          "newlines-between": "always",
        },
      ],

      // 💅 JSX 안에 boolean prop은 {true} 생략 권장
      "react/jsx-boolean-value": ["warn", "never"],

      // ❗ JSX props 정렬
      "react/jsx-sort-props": [
        "warn",
        { callbacksLast: true, shorthandFirst: true },
      ],

      // 💬 JSX 속성 너무 길면 줄바꿈
      "react/jsx-max-props-per-line": [
        "warn",
        { maximum: 1, when: "multiline" },
      ],

      // 🔐 JSX key 누락 방지
      "react/jsx-key": "error",

      // 🧱 타입스크립트 명확성
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/explicit-module-boundary-types": "warn",
    },
  },
];

export default eslintConfig;
