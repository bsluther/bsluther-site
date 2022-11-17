const withTM = require('next-transpile-modules')(['ui', 'measure-ts', 'ahp']);

module.exports = withTM({
  reactStrictMode: true,
});