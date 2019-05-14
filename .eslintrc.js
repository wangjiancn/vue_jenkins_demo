module.exports = {
  env: {
    browser: true,
    commonjs: true,
    node: true,
    es6: true
  },
  extends: [
    // "eslint:recommended",
    'plugin:vue/essential',
    'plugin:vue/recommended'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaVersion: 2018,
    parser: 'babel-eslint',
    sourceType: 'module'
  },
  plugins: ['vue', 'html'],
  rules: {
    'vue/html-self-closing': 'off',
    'vue/singleline-html-element-content-newline': 'off',
    'vue/html-closing-bracket-spacing': 'off',
    'vue/multiline-html-element-content-newline': 'off',
    'vue/max-attributes-per-line': 'off'
  }
}
