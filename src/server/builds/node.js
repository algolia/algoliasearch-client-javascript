// This is the Node.JS entry point
module.exports = algoliasearch;

var debug = require('debug')('algoliasearch:nodejs');
var crypto = require('crypto');

var inherits = require('inherits');
var Promise = global.Promise || require('es6-promise').Promise;
var semver = require('semver');

var AlgoliaSearchServer = require('./AlgoliaSearchServer');
var errors = require('../../errors');

// does not work on node < 0.8
if (semver.satisfies(process.version, '<=0.7')) {
  throw new errors.AlgoliaSearchError('Node.js version ' + process.version + ' is not supported');
}

debug('loaded the Node.js client');

function algoliasearch(applicationID, apiKey, opts) {
  var cloneDeep = require('lodash-compat/lang/cloneDeep');
  var reduce = require('lodash-compat/collection/reduce');

  if (!opts) {
    opts = {};
  }

  var httpAgent = opts.httpAgent;

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

  // inactivity timeout
  if (opts.timeout === undefined) {
    opts.timeout = 15000;
  }

  if (opts.protocol === undefined) {
    opts.protocol = 'https:';
  }

  opts._ua = opts._ua || algoliasearch.ua;
  opts._useCache = false;

  return new AlgoliaSearchNodeJS(applicationID, apiKey, opts);
}

algoliasearch.version = require('../../version.json');
algoliasearch.ua = 'Algolia for Node.js ' + algoliasearch.version;

function AlgoliaSearchNodeJS(applicationID, apiKey, opts) {
  var getAgent = require('./get-agent');

  // call AlgoliaSearchServer constructor
  AlgoliaSearchServer.apply(this, arguments);

  this._Agent = opts.httpAgent || getAgent(opts.protocol);
}

inherits(AlgoliaSearchNodeJS, AlgoliaSearchServer);

AlgoliaSearchNodeJS.prototype._request = function(rawUrl, opts) {
  var http = require('http');
  var https = require('https');
  var url = require('url');

  var client = this;

  return new Promise(function doReq(resolve, reject) {
    opts.debug('url: %s, method: %s, timeout: %d', rawUrl, opts.method, opts.timeout);

    var body = opts.body;
    var debugInterval;

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

    if (body) {
      req.setHeader('content-type', 'application/json');
      req.write(body);

      // debug request body/sent
      // only when DEBUG=debugBody is found
      if (process.env.DEBUG && process.env.DEBUG.indexOf('debugBody') !== -1) {
        req.once('socket', function() {
          debugBytesSent();
          debugInterval = setInterval(debugBytesSent, 100);
          req.socket.once('end', stopDebug);
          req.socket.once('close', stopDebug);
        });
      }
    }

    req.end();

    function response(res) {
      var chunks = [];

      res.on('data', onData);
      res.once('end', onEnd);

      function onData(chunk) {
        chunks.push(chunk);
      }

      function onEnd() {
        var data = Buffer.concat(chunks).toString();
        var out;

        try {
          out = {
            body: JSON.parse(data),
            statusCode: res.statusCode,
            headers: res.headers
          };
        } catch(e) {
          out = new errors.UnparsableJSON({more: data});
        }

        if (out instanceof errors.UnparsableJSON) {
          reject(out);
        } else {
          resolve(out);
        }
      }
    }

    function error(err) {
      opts.debug('error: %j  - %s', err, rawUrl);

      if (timedOut) {
        opts.debug('request had already timedout');
        return;
      }

      reject(new errors.Network(err.message, err));
    }

    function timeout() {
      timedOut = true;
      opts.debug('timeout %s', rawUrl);
      req.abort();
      reject(new errors.RequestTimeout());
    }

    function debugBytesSent() {
      var remaining = Buffer.byteLength(body) + Buffer.byteLength(req._header);
      var sent = req.socket.bytesWritten;
      opts.debug('sent/remaining bytes: %d/%d', sent, remaining);
    }

    function stopDebug() {
      req.socket.removeListener('end', stopDebug);
      req.socket.removeListener('close', stopDebug);
      opts.debug('socket end');
      debugBytesSent();
      clearInterval(debugInterval);
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
