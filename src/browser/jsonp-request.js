/* eslint-disable no-param-reassign */
'use strict';

module.exports = jsonpRequest;

const errors = require('../errors');

let JSONPCounter = 0;

function jsonpRequest(url, opts, cb) {
  if (opts.method !== 'GET') {
    cb(new Error(`Method ${opts.method} ${url} is not supported by JSONP.`));
    return;
  }

  opts.debug('JSONP: start');

  let cbCalled = false;
  let timedOut = false;

  JSONPCounter += 1;
  const head = document.getElementsByTagName('head')[0];
  const script = document.createElement('script');
  const cbName = `algoliaJSONP_${JSONPCounter}`;
  let done = false;

  window[cbName] = function(data) {
    removeGlobals();

    if (timedOut) {
      opts.debug('JSONP: Late answer, ignoring');
      return;
    }

    cbCalled = true;

    clean();

    cb(null, {
      body: data /* ,
      // We do not send the statusCode, there's no statusCode in JSONP, it will be
      // computed using data.status && data.message like with XDR
      statusCode*/,
    });
  };

  // add callback by hand
  url += `&callback=${cbName}`;

  // add body params manually
  if (opts.jsonBody && opts.jsonBody.params) {
    url += `&${opts.jsonBody.params}`;
  }

  const ontimeout = setTimeout(timeout, opts.timeouts.complete);

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
    opts.debug('JSONP: success');

    if (done || timedOut) {
      return;
    }

    done = true;

    // script loaded but did not call the fn => script loading error
    if (!cbCalled) {
      opts.debug('JSONP: Fail. Script loaded but did not call the callback');
      clean();
      cb(new errors.JSONPScriptFail());
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
  }

  function removeGlobals() {
    try {
      delete window[cbName];
      delete window[`${cbName}_loaded`];
    } catch (e) {
      window[`${cbName}_loaded`] = undefined;
      window[cbName] = undefined;
    }
  }

  function timeout() {
    opts.debug('JSONP: Script timeout');
    timedOut = true;
    clean();
    cb(new errors.RequestTimeout());
  }

  function error() {
    opts.debug('JSONP: Script error');

    if (done || timedOut) {
      return;
    }

    clean();
    cb(new errors.JSONPScriptError());
  }
}
