module.exports = {
  root: true,
  env: { browser: true, node: true, es2024: true },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    ecmaFeatures: { jsx: true },
  },
  plugins: ["react", "react-hooks", "@typescript-eslint", "react-refresh"],
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/jsx-runtime",
  ],
  rules: {
    "no-undef": "error",

    // 🔥 Tắt rule gốc để tránh xung đột
    "no-unused-vars": "off",

    // 🔥 Muốn không báo lỗi unused imports → set "off" hoặc "warn"
    "@typescript-eslint/no-unused-vars": [
      "warn", // hoặc "off"
      {
        vars: "all",
        args: "after-used",
        ignoreRestSiblings: true,
      },
    ],

    "no-console": "warn",
    "react/jsx-no-undef": "error",
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
  },
  settings: { react: { version: "detect" } },
};
