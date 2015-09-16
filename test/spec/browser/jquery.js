'use strict';

/* eslint new-cap: 0 */

var test = require('tape');

var browser = require('bowser');

// run jQuery test on all browsers but IE < 10
// jQuery 2 does not support cross domain xhr with IE < 10
// why do we even have a jQuery build?
// http://jquery.com/download/#jquery-2-x
// guess what there's even a plugin! http://cdnjs.com/libraries/jquery-ajaxtransport-xdomainrequest
if (!browser.msie || parseFloat(browser.version) > 8) {
  test('jQuery module success case', function(t) {
    var fauxJax = require('faux-jax');
    var parse = require('url-parse');

    if (fauxJax.support.xhr.cors) {
      t.plan(10);
    } else {
      t.plan(9);
    }

    // load jQuery Algolia Search module
    require('../../../src/browser/builds/algoliasearch.jquery');

    t.ok(window.$.algolia, 'we exported an `algolia` property on jQuery');

    var client = window.$.algolia.Client('jquery-success-applicationID', 'jquery-success-apiKey');
    var index = client.initIndex('jquery-success-indexName');

    fauxJax.install();

    index.search('jquery-success-promise').done(function searchDone(content) {
      t.deepEqual(content, {
        YAW: 'jquery-promise'
      });
    });

    index.search('jquery-success-callback', function searchDone(err, content) {
      t.error(err, 'No error while using the jQuery module');
      t.deepEqual(content, {
        YAW: 'jquery-cb'
      });
    });

    fauxJax.waitFor(2, function(err, requests) {
      t.error(err);
      t.equal(
        requests.length,
        2,
        'Two requests made'
      );

      var firstRequest = requests[0];
      var secondRequest = requests[1];
      var requestURL = parse(firstRequest.requestURL, true);

      if (fauxJax.support.xhr.cors) {
        t.deepEqual(
          firstRequest.requestHeaders, {
            'Content-Type': 'application/x-www-form-urlencoded',
            Accept: 'application/json'
          },
          'requestHeaders matches'
        );
      }

      t.equal(
        requestURL.host,
        'jquery-success-applicationid-dsn.algolia.net',
        'requestURL host matches'
      );

      t.equal(
        requestURL.pathname,
        '/1/indexes/jquery-success-indexName/query',
        'requestURL pathname matches'
      );

      t.deepEqual(
        requestURL.query, {
          'x-algolia-api-key': 'jquery-success-apiKey',
          'x-algolia-application-id': 'jquery-success-applicationID',
          'x-algolia-agent': window.$.algolia.ua
        },
        'requestURL query matches'
      );

      firstRequest.respond(
        200,
        {},
        JSON.stringify({
          YAW: 'jquery-promise'
        })
      );

      secondRequest.respond(
        200,
        {},
        JSON.stringify({
          YAW: 'jquery-cb'
        })
      );

      fauxJax.restore();
    });
  });

  test('jQuery module error case', function(t) {
    t.plan(4);

    var fauxJax = require('faux-jax');

    // load jQuery Algolia Search module
    require('../../../src/browser/builds/algoliasearch.jquery');

    var client = window.$.algolia.Client('jquery-error-applicationID', 'jquery-error-apiKey');
    var index = client.initIndex('jquery-error-indexName');

    fauxJax.install();

    index.search('jquery-error-promise').fail(function searchDone(err) {
      t.equal(
        err.message,
        'Nope promise jQuery',
        'Err message matches in promise mode'
      );
    });

    index.search('jquery-error-callback', function searchDone(err) {
      t.equal(
        err.message,
        'Nope callback jQuery',
        'Err message matches in callback mode'
      );
    });

    fauxJax.waitFor(2, function(err, requests) {
      t.error(err);
      t.equal(
        requests.length,
        2,
        'Two requests made'
      );

      var firstRequest = requests[0];
      var secondRequest = requests[1];

      firstRequest.respond(
        400,
        {},
        JSON.stringify({
          message: 'Nope promise jQuery',
          status: 400
        })
      );

      secondRequest.respond(
        400,
        {},
        JSON.stringify({
          message: 'Nope callback jQuery',
          status: 400
        })
      );

      fauxJax.restore();
    });
  });

  test('jQuery JSONP fallback', function(t) {
    t.plan(4);

    var fauxJax = require('faux-jax');
    var parse = require('url-parse');

    var currentURL = parse(location.href);

    // load jQuery Algolia Search module
    require('../../../src/browser/builds/algoliasearch.jquery');

    var client = window.$.algolia.Client(
      'jquery-error-applicationID',
      'jquery-error-apiKey', {
        hosts: [
          currentURL.host
        ],
        timeout: 5000
      }
    );
    var index = client.initIndex('simple-JSONP-response');

    fauxJax.install();

    index.search('jquery-first').done(function searchDone(content) {
      t.deepEqual(
        content, {
          query: 'jquery-first'
        },
        'Content matches'
      );
    });

    index.search('jquery-second', function searchDone(err, content) {
      t.error(
        err,
        'No error while using the callback interface'
      );

      t.deepEqual(
        content, {
          query: 'jquery-second'
        },
        'Content matches'
      );
    });

    fauxJax.waitFor(2, function(err, requests) {
      t.error(err);
      requests[0]
        .respond(500, {}, JSON.stringify({message: 'Nope promise', status: 500}));
      requests[1]
        .respond(500, {}, JSON.stringify({message: 'Nope callback', status: 500}));

      fauxJax.restore();
    });
  });

  test('jQuery module timeout case', function(t) {
    t.plan(3);
    var requestTimeout = 1000;

    var fauxJax = require('faux-jax');

    // load jQuery Algolia Search module
    require('../../../src/browser/builds/algoliasearch.jquery');

    var client = window.$.algolia.Client(
      'jquery-error-applicationID',
      'jquery-error-apiKey', {
        timeout: requestTimeout
      });
    var index = client.initIndex('jquery-error-indexName');

    fauxJax.install();

    index.search('jquery-timeout-promise').then(function searchDone(content) {
      fauxJax.restore();

      t.deepEqual(
        content, {
          yaw: 'JQUERY! timeout'
        },
        'Content matches'
      );
    });

    fauxJax.waitFor(2, function(err, requests) {
      t.error(err);
      t.equal(2, requests.length, 'Two requests made');

      setTimeout(function() {
        requests[1].respond(200, {}, JSON.stringify({yaw: 'JQUERY! timeout'}));
      }, requestTimeout / 2);
    });
  });
}
