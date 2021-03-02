module.exports = {
  extends: ['airbnb', 'airbnb/hooks'],
  env: {
    browser: true,
    node: true,
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
};
