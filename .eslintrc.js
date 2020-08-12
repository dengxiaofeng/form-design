module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/recommended', 'airbnb-base'],
  rules: {
    'no-console': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    semi: [2, 'never'],
    'max-len': [
      1,
      {
        code: 120
      }
    ]
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  globals: {
    location: false
  }
}
