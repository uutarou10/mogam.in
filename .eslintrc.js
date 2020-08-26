module.exports = {
  // なぜかエディタがエラー吐くので書いてみた。
  "ignorePatterns": ['.eslintrc.js'],
  "env": {
        "browser": true,
        "es2020": true,
        "node": false
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended",
        "prettier"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 12,
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "@typescript-eslint"
    ],
    "rules": {
      "@typescript-eslint/explicit-module-boundary-types": "off"
    }
};
