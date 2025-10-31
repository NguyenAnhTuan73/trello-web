module.exports = {
  root: true,
  env: { browser: true, node: true, es2024: true },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:react/jsx-runtime",
  ],
  parserOptions: {
    requireConfigFile: false,
    babelOptions: { presets: ["@babel/preset-react"] },
    ecmaVersion: "latest",
    sourceType: "module",
    ecmaFeatures: { jsx: true },
  },
  plugins: ["react", "react-hooks", "react-refresh"],
  rules: {
    "no-undef": "error",
    "no-unused-vars": [
      "error",
      { vars: "all", args: "after-used", ignoreRestSiblings: false },
    ],

    "no-console": "warn",
    "react/jsx-no-undef": "error",
    "react/react-in-jsx-scope": "off",
    // "react-refresh/only-export-components": "warn",
  },
  settings: { react: { version: "detect" } },
};
