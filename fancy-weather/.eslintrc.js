module.exports = {
  env: {
    commonjs: true,
    es6: true,
    node: true,
    jest: true,
    browser: true,
  },
  extends: [
    'airbnb/base',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {
    "import/prefer-default-export": 0,
    "no-console":0,
    "no-else-return": 0,
    // "linebreak-style":0,
    // "no-multiple-empty-lines":0,
    // "indent":0,
    // "comma-spacing":0,
    // "semi":0,
    // "padded-blocks":0,
    // "space-before-blocks":0,
    // "object-curly-spacing":0,
    // "quotes":0,
    // "keyword-spacing":0,
    // "quote-props":0,

  },
};
