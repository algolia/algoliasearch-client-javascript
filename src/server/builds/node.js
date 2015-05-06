// This is the Node.JS entry point
module.exports = algoliasearch;

var debug = require('debug')('algoliasearch:nodejs');
var crypto = require('crypto');

var inherits = require('inherits');
var Promise = global.Promise || require('es6-promise').Promise;
var semver = require('semver');

var AlgoliaSearchServer = require('./AlgoliaSearchServer');

// does not work on node < 0.8
if (semver.satisfies(process.version, '<=0.7')) {
  throw new Error('algoliasearch: Node.js version ' + process.version + ' is not supported');
}

debug('loaded the Node.js client');

function algoliasearch(applicationID, apiKey, opts) {
  var extend = require('extend');
  opts = extend(true, {}, opts) || {};

  if (opts.timeout === undefined) {
    opts.timeout = 3000;
  }

  if (opts.protocol === undefined) {
    opts.protocol = 'https:';
  }

  opts._ua = algoliasearch.ua;
  opts._useCache = false;

  return new AlgoliaSearchNodeJS(applicationID, apiKey, opts);
}

algoliasearch.version = require('../../version.json');
algoliasearch.ua = 'Algolia for Node.js ' + algoliasearch.version;

function AlgoliaSearchNodeJS(applicationID, apiKey, opts) {
  var getAgent = require('./get-agent');

  // call AlgoliaSearchServer constructor
  AlgoliaSearchServer.apply(this, arguments);

  this._Agent = getAgent(opts.protocol);
}

inherits(AlgoliaSearchNodeJS, AlgoliaSearchServer);


AlgoliaSearchNodeJS.prototype._request = function(rawUrl, opts) {
  var http = require('http');
  var https = require('https');
  var url = require('url');

  var client = this;

  return new Promise(function doReq(resolve, reject) {
    debug('url: %s, opts: %j', rawUrl, opts);

    var parsedUrl = url.parse(rawUrl);
    var requestOptions = {
      hostname: parsedUrl.hostname,
      port: parsedUrl.port,
      method: opts.method,
      path: parsedUrl.path,
      agent: client._Agent
    };

    var timedOut = false;
    var req;

    if (parsedUrl.protocol === 'https:') {
      req = https.request(requestOptions);
    } else {
      req = http.request(requestOptions);
    }

    req.setHeader('connection', 'keep-alive');
    req.setHeader('accept', 'application/json');

    Object.keys(opts.headers).forEach(function setRequestHeader(headerName) {
      req.setHeader(headerName, opts.headers[headerName]);
    });

    // socket inactivity timeout
    // this is not a global timeout on the request
    req.setTimeout(opts.timeout);

    req.once('error', error);
    req.once('timeout', timeout);
    req.once('response', response);

    if (opts.body !== undefined) {
      req.setHeader('content-type', 'application/json');
      req.write(JSON.stringify(opts.body));
    }

    req.end();

    function response(res) {
      var chunks = [];

      res.on('data', data);
      res.once('end', end);

      function data(chunk) {
        chunks.push(chunk);
      }

      function end() {
        resolve({
          statusCode: res.statusCode,
          body: JSON.parse(Buffer.concat(chunks))
        });
      }
    }

    function error(err) {
      debug('Error: %j  - %s %j', err, rawUrl, opts);

      if (timedOut) {
        return;
      }

      reject(err);
    }

    function timeout() {
      timedOut = true;
      debug('Timeout %s %j', rawUrl, opts);
      req.abort();
      resolve(new Error('Timeout'));
    }
  });
};

AlgoliaSearchNodeJS.prototype._promise = {
  reject: function(val) {
    return Promise.reject(val);
  },
  resolve: function(val) {
    return Promise.resolve(val);
  },
  delay: function(ms) {
    return new Promise(function(resolve/*, reject*/) {
      setTimeout(resolve, ms);
    });
  }
};

AlgoliaSearchNodeJS.prototype.destroy = function() {
  this._Agent.destroy();
};

/*
 * Generate a secured and public API Key from a list of tagFilters and an
 * optional user token identifying the current user
 *
 * @param privateApiKey your private API Key
 * @param tagFilters the list of tags applied to the query (used as security)
 * @param userToken an optional token identifying the current user
 */
AlgoliaSearchNodeJS.prototype.generateSecuredApiKey = function(privateApiKey, tagFilters, userToken) {
  if (Array.isArray(tagFilters)) {
    var strTags = [];
    for (var i = 0; i < tagFilters.length; ++i) {
      if (Array.isArray(tagFilters[i])) {
        var oredTags = [];
        for (var j = 0; j < tagFilters[i].length; ++j) {
          oredTags.push(tagFilters[i][j]);
        }
        strTags.push('(' + oredTags.join(',') + ')');
      } else {
        strTags.push(tagFilters[i]);
      }
    }
    tagFilters = strTags.join(',');
  }

  return crypto.createHmac('sha256', privateApiKey).update(tagFilters + (userToken || '')).digest('hex');
};
