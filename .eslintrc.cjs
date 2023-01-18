module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:jsx-a11y/recommended',
    'plugin:@typescript-eslint/recommended',
    'eslint-config-prettier',
  ],
  ignorePatterns: ['.eslintrc.cjs', '/dist'],
  plugins: ['eslint-plugin-prettier'],
  settings: {
    react: {
      version: '18',
    },
  },
  rules: {
    "prettier/prettier": "error",
    "react/prop-types": "off"
  }
};