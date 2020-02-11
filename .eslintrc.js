module.exports = {
  plugins: [
    "prettier",
    "react-hooks"
  ],
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "plugin:react/recommended"
  ],
  rules: {
    "no-console": [
        0
    ],
    "@typescript-eslint/indent": "ignore",
    "prettier/prettier": "error",
    "react-hooks/rules-of-hooks": "error",
    "react-hook/exhaustive-deps": "warn"
  }
};
