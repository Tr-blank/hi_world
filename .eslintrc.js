const isDev = process.env.NODE_ENV === 'development'

module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended'
  ],
  parserOptions: {
    ecmaVersion: 13,
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint'],
  rules: {
    'no-console': isDev ? 0 : 1,
    'no-trailing-spaces': 2,
    'indent': ['error', 2],
    'linebreak-style': 0,
    'quotes': ['error', 'single'],
    'semi': [2, 'never'],
    'no-empty': isDev ? 1 : 2,
    'object-curly-spacing': [2, 'always'],
    'vue/no-unused-components': isDev ? 1 : 2,
    'vue/html-self-closing': 0,
    'comma-dangle': [2, 'never']
  }
}
