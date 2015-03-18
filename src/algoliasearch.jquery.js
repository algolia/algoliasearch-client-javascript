var createAlgoliasearch = require('./create-algoliasearch');
var JSONPRequest = require('./jsonp-request');

var algoliasearch = createAlgoliasearch(request);
var $ = global.jQuery

$.algolia = {Client: algoliasearch};

function request(url, opts) {
  return $.Deferred(function(deferred) {
    var body = null;

    if (opts.body !== undefined) {
      body = JSON.stringify(opts.body);
    }

    $.ajax(url, {
      type: opts.method,
      timeout: opts.timeout,
      dataType: 'json',
      data: body,
      complete: function(jqXHR/*, textStatus , error*/) {
        if (jqXHR.status === 0) {
          deferred.reject(new Error('Network error or timeout'));
          return;
        }

        deferred.resolve({
          statusCode: jqXHR.status,
          body: jqXHR.responseJSON
        });
      }
    });
  }).promise();
}

request.fallback = function(url, opts) {
  return $.Deferred(function(deferred) {
    JSONPRequest(url, opts, function JSONPRequestDone(err, content) {
      if (err) {
        deferred.reject(err);
        return;
      }

      deferred.resolve(content);
    });
  }).promise();
};

request.reject = function(val) {
  return $.Deferred(function(deferred) {
    deferred.reject(val);
  }).promise();
};

request.resolve = function(val) {
  return $.Deferred(function(deferred) {
    deferred.resolve(val);
  }).promise();
};

request.delay = function(ms) {
  return $.Deferred(function(deferred) {
    setTimeout(function() {
      deferred.resolve();
    }, ms);
  }).promise();
};
