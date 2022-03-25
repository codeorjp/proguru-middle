/* eslint-disable @typescript-eslint/no-var-requires */
const { environment } = require('@rails/webpacker');
const erb = require('./loaders/erb');
const typescript = require('./loaders/typescript');

// Enable css modules with sass loader
const sassLoader = environment.loaders.get('sass');
const cssLoader = sassLoader.use.find((loader) => loader.loader === 'css-loader');

cssLoader.options = Object.assign(cssLoader.options, {
  modules: {
    localIdentName: '[path][name]__[local]--[hash:base64:5]',
  },
});

const createjs = {
  resolve: {
    alias: {
      createjs: 'createjs/builds/1.0.0/createjs.js',
    },
  },
  module: {
    rules: [
      {
        test: /node_modules[/\\]createjs/,
        loaders: [
          'imports-loader?this=>window',
          'exports-loader?window.createjs',
        ],
      },
    ],
  },
};

environment.config.merge(createjs);
environment.loaders.prepend('typescript', typescript);
environment.loaders.prepend('erb', erb);
module.exports = environment;
