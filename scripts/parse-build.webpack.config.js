'use strict';

var path = require('path');

module.exports = {
  entry: path.join(__dirname, '..', 'src/server/builds/parse.js'),
  output: {
    path: path.join(__dirname, '..', 'dist'),
    filename: 'algoliasearch.parse.js',
    libraryTarget: 'commonjs2'
  },
  target: 'node',
  resolve: {
    alias: {
      debug: 'debug/browser.js',
      inherits: 'inherits/inherits_browser.js',
      'util-deprecate': 'util-deprecate/browser.js'
    }
  }
};
