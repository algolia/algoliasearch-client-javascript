'use strict';
/* eslint-disable prefer-rest-params, no-param-reassign, consistent-this */
// This is the Node.JS entry point
module.exports = algoliasearch;

const debug = require('debug')('algoliasearch:nodejs');
const crypto = require('crypto');
const zlib = require('zlib');

const inherits = require('inherits');
const Promise = global.Promise || require('es6-promise').Promise;
const semver = require('semver');
const isNotSupported = semver.satisfies(process.version, '<0.10');
const isNode010 = semver.satisfies(process.version, '=0.10');
const places = require('../../places.js');

const AlgoliaSearchServer = require('./AlgoliaSearchServer');
const errors = require('../../errors');

// does not work on node <= 0.8
if (isNotSupported) {
  throw new errors.AlgoliaSearchError(
    `Node.js version ${process.version} is not supported`
  );
}

if (process.env.NODE_ENV === 'debug') {
  require('debug').enable('algoliasearch*');
}

debug('loaded the Node.js client');

function algoliasearch(applicationID, apiKey, opts) {
  const cloneDeep = require('../../clone.js');
  const reduce = require('reduce');

  if (!opts) {
    opts = {};
  }

  const httpAgent = opts.httpAgent;

  opts = cloneDeep(reduce(opts, allButHttpAgent, {}));

  // as an httpAgent is an object with methods etc, we take a reference to
  // it rather than cloning it like other values
  function allButHttpAgent(filteredOpts, val, keyName) {
    if (keyName !== 'httpAgent') {
      filteredOpts[keyName] = val;
    }

    return filteredOpts;
  }

  opts.httpAgent = httpAgent;

  opts.timeouts = opts.timeouts || {
    connect: 2 * 1000,
    read: 5 * 1000,
    write: 30 * 1000,
  };

  if (opts.protocol === undefined) {
    opts.protocol = 'https:';
  }

  opts._ua = opts._ua || algoliasearch.ua;
  opts._useCache = false;

  return new AlgoliaSearchNodeJS(applicationID, apiKey, opts);
}

algoliasearch.version = require('../../version.js');
algoliasearch.ua = `Algolia for Node.js ${algoliasearch.version}`;
algoliasearch.initPlaces = places(algoliasearch);

function AlgoliaSearchNodeJS(applicationID, apiKey, opts) {
  const getAgent = require('./get-agent');

  // call AlgoliaSearchServer constructor
  AlgoliaSearchServer.apply(this, arguments);

  this._Agent = opts.httpAgent || getAgent(opts.protocol);
}

inherits(AlgoliaSearchNodeJS, AlgoliaSearchServer);

AlgoliaSearchNodeJS.prototype._request = function request(rawUrl, opts) {
  const http = require('http');
  const https = require('https');
  const url = require('url');

  const client = this;

  return new Promise((resolve, reject) => {
    opts.debug(
      'url: %s, method: %s, timeouts: %j',
      rawUrl,
      opts.method,
      opts.timeouts
    );

    const body = opts.body;

    const parsedUrl = url.parse(rawUrl);
    const requestOptions = {
      hostname: parsedUrl.hostname,
      port: parsedUrl.port,
      method: opts.method,
      path: parsedUrl.path,
      agent: client._Agent,
    };

    let timedOut = false;
    let timeoutId;
    let req;

    if (parsedUrl.protocol === 'https:') {
      // we do not rely on any "smart" port computing by either node.js
      // or a custom http agent, because:
      // https://github.com/TooTallNate/node-https-proxy-agent/issues/7#issuecomment-119539690
      if (requestOptions.port === null) {
        requestOptions.port = 443;
      }
      req = https.request(requestOptions);
    } else {
      // same reason to set the port as `https:`
      if (requestOptions.port === null) {
        requestOptions.port = 80;
      }
      req = http.request(requestOptions);
    }

    req.setHeader('connection', 'keep-alive');
    req.setHeader('accept', 'application/json');

    Object.keys(opts.headers).forEach(headerName => {
      req.setHeader(headerName, opts.headers[headerName]);
    });

    req.setHeader('accept-encoding', 'gzip,deflate');

    // we do not use req.setTimeout because it's either an inactivity timeout
    // or a global timeout given the nodejs version
    timeoutId = setTimeout(timeout, opts.timeouts.connect);

    req.once('error', error);
    req.once('response', response);
    if (body) {
      req.setHeader('content-type', 'application/json');
      req.setHeader('content-length', Buffer.byteLength(body, 'utf8'));
      req.write(body);
    } else if (req.method === 'DELETE') {
      // Node.js was setting transfer-encoding: chunked on all DELETE requests
      // which is not good since there's no body to be sent, resulting in nginx
      // sending 400 on socket reuse (waiting for previous socket data)
      // https://github.com/nodejs/node-v0.x-archive/issues/6164
      // https://github.com/nodejs/node-v0.x-archive/commit/aef0960
      req.setHeader('content-length', 0);
    }

    req.end();

    function response(res) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(onCompleteTimeout, opts.timeouts.complete);
      const chunks = [];
      const originalRes = res;

      // save headers and statusCode BEFORE treating the response as zlib, otherwise
      // we lose them
      const headers = res.headers;
      const statusCode = res.statusCode;

      // Algolia answers should be gzip when asked for it,
      // but a proxy might uncompress Algolia response
      // So we handle both compressed and uncompressed
      if (
        headers['content-encoding'] === 'gzip' ||
        headers['content-encoding'] === 'deflate'
      ) {
        res = res.pipe(zlib.createUnzip());
      }

      res.on('data', onData).once('end', onEnd);

      function onData(chunk) {
        chunks.push(chunk);
      }

      function onEnd() {
        clearTimeout(timeoutId);

        const data = Buffer.concat(chunks).toString();
        let out;

        try {
          out = {
            body: JSON.parse(data),
            statusCode,
            headers,
          };
        } catch (e) {
          out = new errors.UnparsableJSON({
            more: data,
          });
        }

        if (out instanceof errors.UnparsableJSON) {
          reject(out);
        } else {
          resolve(out);
        }
      }

      function onCompleteTimeout() {
        res.removeListener('data', onData);
        res.removeListener('end', onEnd);
        originalRes.destroy();
        timeout();
      }
    }

    function error(err) {
      opts.debug('error: %j  - %s', err, rawUrl);

      if (timedOut) {
        opts.debug('request had already timedout');
        return;
      }

      abort();
      clearTimeout(timeoutId);
      reject(new errors.Network(err.message, err));
    }

    function timeout() {
      timedOut = true;
      opts.debug('timeout %s', rawUrl);
      abort();
      reject(new errors.RequestTimeout());
    }

    function abort() {
      if (isNode010 && req.socket && req.socket.socket) {
        req.socket.socket.destroy();
      }

      req.removeListener('response', response);
      req.abort();
    }
  });
};

AlgoliaSearchNodeJS.prototype._promise = {
  reject: function reject(val) {
    return Promise.reject(val);
  },
  resolve: function resolve(val) {
    return Promise.resolve(val);
  },
  delay: function delayPromise(ms) {
    return new Promise((resolve /* , reject */) => {
      setTimeout(resolve, ms);
    });
  },
};

AlgoliaSearchNodeJS.prototype.destroy = function destroy() {
  if (typeof this._Agent.destroy === 'function') {
    this._Agent.destroy();
  }
};

/*
 * Generate a secured and public API Key from an apiKey and queryParameters
 * optional user token identifying the current user
 *
 * @param apiKey - The api key to encode as secure
 * @param {Object} [queryParameters] - Any search query parameter
 */
AlgoliaSearchNodeJS.prototype.generateSecuredApiKey = function generateSecuredApiKey(
  privateApiKey,
  queryParametersOrTagFilters,
  userToken
) {
  let searchParams;

  if (Array.isArray(queryParametersOrTagFilters)) {
    // generateSecuredApiKey(apiKey, ['user_42'], userToken);

    searchParams = {
      tagFilters: queryParametersOrTagFilters,
    };

    if (userToken) {
      searchParams.userToken = userToken;
    }

    searchParams = this._getSearchParams(searchParams, '');
  } else if (typeof queryParametersOrTagFilters === 'string') {
    if (queryParametersOrTagFilters.indexOf('=') === -1) {
      // generateSecuredApiKey(apiKey, 'user_42', userToken);
      searchParams = `tagFilters=${queryParametersOrTagFilters}`;
    } else {
      // generateSecuredApiKey(apiKey, 'tagFilters=user_42', userToken);
      searchParams = queryParametersOrTagFilters;
    }

    if (userToken) {
      searchParams += `&userToken=${encodeURIComponent(userToken)}`;
    }
  } else {
    searchParams = this._getSearchParams(queryParametersOrTagFilters, '');
  }

  const securedKey = crypto
    .createHmac('sha256', privateApiKey)
    .update(searchParams)
    .digest('hex');

  return new Buffer(securedKey + searchParams).toString('base64');
};
