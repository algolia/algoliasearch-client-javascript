// this is the standalone build entry of AlgoliaSearch
var createAlgoliasearch = require('./create-algoliasearch');

module.exports = createAlgoliasearch(request);

var JSON2 = require('JSON2');
var Promise = require('promise');

var JSONPCounter = 0;
var support = {
  hasXMLHttpRequest: 'XMLHttpRequest' in window,
  hasXDomainRequest: 'XDomainRequest' in window,
  cors: 'withCredentials' in new XMLHttpRequest(),
  timeout: 'timeout' in new XMLHttpRequest()
};

function request(url, opts) {
  return new Promise(function(resolve, reject) {
    // no cors or XDomainRequest, no request
    if (!support.cors && !support.hasXDomainRequest) {
      // very old browser, not supported
      reject(new Error('CORS not supported'));
      return;
    }

    var body;
    var req = support.cors ? new XMLHttpRequest() : new XDomainRequest();
    var ontimeout;
    var timedOut;

    if (opts.body !== undefined) {
      body = JSON2.stringify(opts.body);
    }

    req.open(opts.method, url);

    if (support.cors && body && opts.method !== 'GET') {
      req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    }

    req.onload = load;
    req.onerror = error;

    if (support.timeout) {
      // .timeout supported by both XHR and XDR,
      // we do receive timeout event, tested
      req.timeout = opts.timeout;

      req.ontimeout = timeout;
    } else {
      ontimeout = setTimeout(timeout, opts.timeout);
    }

    req.send(body);

    // event object not received in IE8, at least
    // but we do not use it, still important to note
    function load(/*event*/) {
      // When browser does not supports req.timeout, we can
      // have both a load and timeout event, since handled by a dumb setTimeout
      if (timedOut) {
        return;
      }

      if (!support.timeout) {
        clearTimeout(ontimeout);
      }

      var response = null;

      try {
        response = JSON2.parse(req.responseText);
      } catch(e) {}

      resolve({
        body: response,
        statusCode: req.status
      });
    }

    function error(event) {
      if (timedOut) {
        return;
      }

      if (!support.timeout) {
        clearTimeout(ontimeout);
      }

      // error event is trigerred both with XDR/XHR on:
      //   - DNS error
      //   - unallowed cross domain request
      reject(new Error('Could not connect to host, error was:' + event));
    }

    function timeout() {
      if (!support.timeout) {
        timedOut = true;
        req.abort();
      }

      reject(new Error('Timeout - Could not connect to endpoint ' + url));
    }

  });
}

request.fallback = function(url, opts) {
  return new Promise(function(resolve, reject) {
    if (opts.method !== 'GET') {
      reject(new Error('Method ' + opts.method + ' ' + url + ' is not supported by JSONP.'));
      return;
    }

    var cbCalled = false;
    var timedOut = false;

    JSONPCounter += 1;
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    var cbName = 'algoliaJSONP_' + JSONPCounter;
    var done = false;

    window[cbName] = function(data) {
      try {
        delete window[cbName];
      } catch (e) {
        window[cbName] = undefined;
      }

      if (timedOut) {
        return;
      }

      cbCalled = true;

      clean();

      resolve({
        body: data/*,
        // We do not send the statusCode, there's no statusCode in JSONP, it will be
        // computed using data.status && data.message like with XDR
        statusCode*/
      });
    };

    // add callback by hand
    url += '&callback=' + cbName;

    // add body params by hand
    if (opts.body && opts.body.params) {
      url += '&' + opts.body.params;
    }

    var ontimeout = setTimeout(timeout, opts.timeout);

    // script onreadystatechange needed only for
    // <= IE8
    // https://github.com/angular/angular.js/issues/4523
    script.onreadystatechange = readystatechange;
    script.onload = success;
    script.onerror = error;

    script.async = true;
    script.defer = true;
    script.src = url;
    head.appendChild(script);

    function success() {
      if (done || timedOut) {
        return;
      }

      done = true;

      // script loaded but did not call the fn => script loading error
      if (!cbCalled) {
        clean();
        reject(new Error('Failed to load JSONP script'));
      }
    }

    function readystatechange() {
      if (this.readyState === 'loaded' || this.readyState === 'complete') {
        success();
      }
    }

    function clean() {
      clearTimeout(ontimeout);
      script.onload = null;
      script.onreadystatechange = null;
      script.onerror = null;
      head.removeChild(script);

      try {
        delete window[cbName];
        delete window[cbName + '_loaded'];
      } catch (e) {
        window[cbName] = null;
        window[cbName + '_loaded'] = null;
      }
    }

    function timeout() {
      timedOut = true;
      clean();
      reject(new Error('Timeout - Could not connect to endpoint ' + url));
    }

    function error() {
      if (done || timedOut) {
        return;
      }

      clean();
      reject(new Error('Failed to load JSONP script'));
    }
  });
};

request.reject = function(val) {
  return Promise.reject(val);
};

request.resolve = function(val) {
  return Promise.resolve(val);
};
