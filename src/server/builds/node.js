// This is the Node.JS entry point
module.exports = algoliasearch;

var debug = require('debug')('algoliasearch:nodejs');

var inherits = require('inherits');
var Promise = global.Promise || require('es6-promise').Promise;
var semver = require('semver');

var AlgoliaSearch = require('../../AlgoliaSearch');

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
  var getKeepaliveAgent = require('./get-keepalive-agent');

  // call AlgoliaSearch constructor
  AlgoliaSearch.apply(this, arguments);

  this._keepaliveAgent = getKeepaliveAgent(opts.protocol);
}

inherits(AlgoliaSearchNodeJS, AlgoliaSearch);

// node 0.10 => agentkeepalive
// node 0.12 => native keepalive
// iojs => native keepalive
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
      agent: client._keepaliveAgent/*,
      // ??
      // https://github.com/iojs/io.js/issues/1300
      keepAlive: true*/
    };

    var timedOut = false;
    var req;

    if (parsedUrl.protocol === 'https:') {
      req = https.request(requestOptions);
    } else {
      req = http.request(requestOptions);
    }

    req.setHeader('connection', 'keep-alive');

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
  this._keepaliveAgent.destroy();
};

/*
 * Allow to use IP rate limit when you have a proxy between end-user and Algolia.
 * This option will set the X-Forwarded-For HTTP header with the client IP and the X-Forwarded-API-Key with the API Key having rate limits.
 * @param adminAPIKey the admin API Key you can find in your dashboard
 * @param endUserIP the end user IP (you can use both IPV4 or IPV6 syntax)
 * @param rateLimitAPIKey the API key on which you have a rate limit
 */
AlgoliaSearchNodeJS.prototype.enableRateLimitForward = function(adminAPIKey, endUserIP, rateLimitAPIKey) {
  this._forward = {
    adminAPIKey: adminAPIKey,
    endUserIP: endUserIP,
    rateLimitAPIKey: rateLimitAPIKey
  };
};

/*
 * Disable IP rate limit enabled with enableRateLimitForward() function
 */
AlgoliaSearchNodeJS.prototype.disableRateLimitForward = function() {
  this._forward = null;
};

/*
 * Specify the securedAPIKey to use with associated information
 */
AlgoliaSearchNodeJS.prototype.useSecuredAPIKey = function(securedAPIKey, securityTags, userToken) {
  this._secure = {
    apiKey: securedAPIKey,
    securityTags: securityTags,
    userToken: userToken
  };
};

/*
 * If a secured API was used, disable it
 */
AlgoliaSearchNodeJS.prototype.disableSecuredAPIKey = function() {
  this._secure = null;
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

AlgoliaSearchNodeJS.prototype._computeRequestHeaders = function() {
  var headers = AlgoliaSearchNodeJS.super_.prototype._computeRequestHeaders.call(this);

  if (this._forward) {
      headers['x-algolia-api-key'] = this._forward.adminAPIKey;
      headers['x-forwarded-for'] = this._forward.endUserIP;
      headers['x-forwarded-api-key'] = this._forward.rateLimitAPIKey;
  }

  if (this._secure) {
    headers['x-algolia-api-key'] = this._secure.apiKey;
    headers['x-algolia-tagfilters'] = this._secure.securityTags;
    headers['x-algolia-usertoken'] = this._secure.userToken;
  }

  return headers;
};
