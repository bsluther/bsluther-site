const withTM = require('next-transpile-modules')(['ui', 'measure-ts', 'ahp-0', 'ahp-1']);

module.exports = withTM({
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true
  }
});