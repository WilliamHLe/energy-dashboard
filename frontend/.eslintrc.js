module.exports = {
  extends: ['airbnb', 'airbnb/hooks', 'plugin:jsx-a11y/recommended'],
  env: {
    browser: true,
    jest: true,
  },
  parser: 'babel-eslint',
  globals: {
    document: false,
  },
  rules: {
    'linebreak-style': ['error', (process.platform === 'win32' ? 'windows' : 'unix')],
    'react/jsx-filename-extension': [2, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
    'import/no-unresolved': 0,
    'import/extensions': 0,
  },
  plugins: [
    'jsx-a11y',
  ],
};
