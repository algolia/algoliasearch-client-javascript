// This is the Parse entry point
// See https://www.parse.com/docs/cloud_code_guide#cloud_code
module.exports = algoliasearch;

process.env = {};
/*global global:true*/
global = {};

var debug = require('debug')('algoliasearch:parse');

var inherits = require('inherits');

var AlgoliaSearchServer = require('./AlgoliaSearchServer');


debug('loaded the Parse client');

function algoliasearch(applicationID, apiKey, opts) {
  var extend = require('extend');
  opts = extend(true, {}, opts) || {};

  if (opts.protocol === undefined) {
    opts.protocol = 'https:';
  }

  opts._setTimeout = _setTimeout;

  opts._ua = algoliasearch.ua;
  opts._useCache = false;

  return new AlgoliaSearchParse(applicationID, apiKey, opts);
}

algoliasearch.version = require('../../version.json');
algoliasearch.ua = 'Algolia for Parse ' + algoliasearch.version;

function AlgoliaSearchParse() {
  // call AlgoliaSearchServer constructor
  AlgoliaSearchServer.apply(this, arguments);
}

inherits(AlgoliaSearchParse, AlgoliaSearchServer);

AlgoliaSearchParse.prototype._request = function(rawUrl, opts) {
  /*global Parse*/
  var extend = require('extend');
  var promise = new Parse.Promise();

  debug('url: %s, opts: %j', rawUrl, opts);

  var parseReqOpts = {
    url: rawUrl,
    headers: extend([], opts.headers),
    method: opts.method,
    success: success,
    error: error
  };

  if (opts.body !== undefined) {
    // parse is proxing our requests and requires us to set a charset. while json is always utf-8
    parseReqOpts.headers['content-type'] = 'application/json;charset=utf-8';
    parseReqOpts.body = opts.body;
  }

  Parse.Cloud.httpRequest(parseReqOpts);

  function error(res) {
    debug('Error: %j  - %s %j', res, rawUrl, opts);

    // we still resolve, bc Parse does not distinguish network errors
    // from 400/500 statuses
    promise.resolve({
      statusCode: res.status,
      body: res.data
    });
  }

  function success(res) {
    debug('Success: %j  - %s %j', res, rawUrl, opts);

    promise.resolve({
      statusCode: res.status,
      body: res.data
    });
  }

  return promise;
};

AlgoliaSearchParse.prototype._promise = {
  reject: function(val) {
    return Parse.Promise.error(val);
  },
  resolve: function(val) {
    return Parse.Promise.as(val);
  },
  delay: function(ms) {
    var promise = new Parse.Promise();

    _setTimeout(promise.resolve.bind(promise), ms);

    return promise;
  }
};

// There's no setTimeout in Parse cloud, but we have nextTick
function _setTimeout(fn, ms) {
  var start = Date.now();

  process.nextTick(fakeSetTimeout);

  function fakeSetTimeout() {
    if (Date.now() < start + ms) {
      process.nextTick(fakeSetTimeout);
      return;
    }

    fn();
  }
}
