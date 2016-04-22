'use strict';

var Promise = window.Promise || require('es6-promise').Promise;
var AlgoliaSearch = require('../../AlgoliaSearch.js');
var createAlgoliasearch = require('../createAlgoliasearch.js');

// This is the standalone browser build entry point
// Browser implementation of the Algolia Search JavaScript client,
// using XMLHttpRequest, XDomainRequest and JSONP as fallback
module.exports = createAlgoliasearch(AlgoliaSearch, Promise);
