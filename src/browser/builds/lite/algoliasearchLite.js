'use strict';

var AlgoliaSearchCore = require('../../../AlgoliaSearchCore.js');
var createAlgoliasearch = require('../../createAlgoliasearch.js');

// This is the standalone browser build entry point
// Browser implementation of the Algolia Search JavaScript client,
// using XMLHttpRequest, XDomainRequest and JSONP as fallback
module.exports = createAlgoliasearch(AlgoliaSearchCore, window.Promise, '(lite) ');
