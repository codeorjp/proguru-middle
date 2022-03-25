process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const eslint = require('./loaders/eslint');
const environment = require('./environment');

environment.plugins.append(
  'BundleAnalyzer',
  new BundleAnalyzerPlugin({ openAnalyzer: false, analyzerMode: 'static' }),
);

environment.loaders.append('eslint', eslint);
module.exports = environment.toWebpackConfig();
