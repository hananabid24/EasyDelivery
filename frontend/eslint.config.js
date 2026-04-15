import prettier from "eslint-plugin-prettier";

export default [
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",

      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },

      globals: {
        window: "readonly",
        document: "readonly",
        console: "readonly",
        localStorage: "readonly",
        alert: "readonly",
      },
    },

    plugins: {
      prettier,
    },

    rules: {
      "prettier/prettier": "off",
    },
  },
];