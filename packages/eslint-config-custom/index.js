module.exports = {
  extends: ['next', 'turbo', 'plugin:prettier/recommended'],
  rules: {
    '@next/next/no-html-link-for-pages': 'off',
  },
  parserOptions: {
    babelOptions: {
      presets: [require.resolve('next/babel')],
    },
  },
};
