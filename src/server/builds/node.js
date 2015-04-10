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

  return new AlgoliaSearchNodeJS(applicationID, apiKey, opts);
}

algoliasearch.version = require('../../version.json');

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
    // BUG: This will hang the program on node < 0.11
    //  - https://github.com/node-modules/agentkeepalive/issues/17
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
