'use strict';

/* eslint new-cap: 0 */
const test = require('tape');

const browser = require('bowser');

// run AngularJS test on all browsers but IE < 9
// https://docs.angularjs.org/guide/ie
if (!browser.msie || parseFloat(browser.version) > 8) {
  test('AngularJS module success case', t => {
    let fauxJax = require('faux-jax');
    let parse = require('url-parse');

    if (fauxJax.support.xhr.cors) {
      t.plan(10);
    } else {
      t.plan(9);
    }

    // load AngularJS Algolia Search module
    require('../../../src/browser/builds/algoliasearch.angular');

    window.angular
      .module('angularTestSuccess', ['algoliasearch'])
      .controller('AngularModuleSearchControllerTestSuccess', [
        '$scope',
        '$timeout',
        'algolia',
        function($scope, $timeout, algolia) {
          t.pass('AngularJS controller initialized');
        let client = algolia.Client('angularTestSuccessAPPID', 'angularTestSuccessKEY');
          var index = client.initIndex('angularTestSuccessINDEX');
          fauxJax.install();

          index.search('SMG').then((content) => {
          t.deepEqual(content, {
            YAW: 'angular-promise'
          });
        });

          index.search('BOUM', (err, content) => {
          t.error(err, 'No error while using the AngularJS module');
          t.deepEqual(content, {
            YAW: 'angular-cb'
          });
        });

          fauxJax.waitFor(2, (err, requests) => {
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
                'content-type': 'application/x-www-form-urlencoded',
                accept: 'application/json'
              },
              'requestHeaders matches'
            );
          }

          t.equal(
            requestURL.host,
            'angulartestsuccessappid-dsn.algolia.net',
            'requestURL host matches'
          );

          t.equal(
            requestURL.pathname,
            '/1/indexes/angularTestSuccessINDEX/query',
            'requestURL pathname matches'
          );

          t.deepEqual(
            requestURL.query, {
              'x-algolia-api-key': 'angularTestSuccessKEY',
              'x-algolia-application-id': 'angularTestSuccessAPPID',
              'x-algolia-agent': algolia.ua
            },
            'requestURL query matches'
          );

          firstRequest.respond(
            200,
            {},
            JSON.stringify({
              YAW: 'angular-promise'
            })
          );

          secondRequest.respond(
            200,
            {},
            JSON.stringify({
              YAW: 'angular-cb'
            })
          );

          fauxJax.restore();
        });
        },
      ]);

    window.angular.element(document).ready(() => {
      window.angular.bootstrap(window.angular.element('#angular-test-success'), ['angularTestSuccess']);
    });
  });

  test('AngularJS module error case', t => {
    t.plan(6);

    let fauxJax = require('faux-jax');

    // load AngularJS Algolia Search module
    require('../../../src/browser/builds/algoliasearch.angular');

    window.angular
      .module('angularTestError', ['algoliasearch'])
      .controller('AngularModuleSearchControllerTestError', [
        '$scope',
        '$timeout',
        'algolia',
        function($scope, $timeout, algolia) {
          t.pass('AngularJS controller initialized');
        let client = algolia.Client('angularTestErrorAPPID', 'angularTestErrorKEY');
          let index = client.initIndex('angularTestErrorINDEX');
          fauxJax.install();

          // careful, cannot use .catch here, will throw in IE8
          // even if this test does not run on IE8, it's still parsed
          index.search('SMG').then(null, (err) => {
          t.equal(
            err.message,
            'Nope promise',
            'Error message matches'
          );
          t.ok(err instanceof Error, 'Promise was rejected');
        });

          index.search('BOUM', (err) => {
          t.equal(
            err.message,
            'Nope callback',
            'Error message matches'
          );
          t.ok(err instanceof Error, 'Callback first argument is an `Error`');
        });

          fauxJax.waitFor(2, (err, requests) => {
          t.error(err);
          requests[0].respond(400, {}, JSON.stringify({message: 'Nope promise'}));
          requests[1].respond(400, {}, JSON.stringify({message: 'Nope callback'}));
          fauxJax.restore();
        });
        },
      ]);

    window.angular.element(document).ready(() => {
      window.angular.bootstrap(window.angular.element('#angular-test-error'), ['angularTestError']);
    });
  });

  test('AngularJS module JSONP fallback', t => {
    t.plan(5);

    let fauxJax = require('faux-jax');
    let parse = require('url-parse');

    let currentURL = parse(location.href);

    // load AngularJS Algolia Search module
    require('../../../src/browser/builds/algoliasearch.angular');

    window.angular
      .module('angularJSONPFallback', ['algoliasearch'])
      .controller('AngularModuleSearchControllerTestJSONPFallback', [
        '$scope',
        '$timeout',
        'algolia',
        function($scope, $timeout, algolia) {
          t.pass('AngularJS controller initialized');
        let client = algolia.Client('angularJSONPFallbackAPPID', 'angularJSONPFallbackKEY', {
            {
              hosts: [currentURL.host],
              timeout: 5000,
            }
          );
          let index = client.initIndex('simple-JSONP-response');
          fauxJax.install();

          index.search('angular-first').then((content) => {
          t.deepEqual(
            content, {
              query: 'angular-first'
            },
            'Content matches'
          );
        });

          index.search('angular-second', (err, content) => {
          t.error(
            err,
            'No error while using the callback interface'
          );

          t.deepEqual(
            content, {
              query: 'angular-second'
            },
            'Content matches'
          );
        });

          fauxJax.waitFor(2, (err, requests) => {
          t.error(err);
          requests[0].respond(500, {}, JSON.stringify({message: 'Nope promise'}));
          requests[1].respond(500, {}, JSON.stringify({message: 'Nope callback'}));
          fauxJax.restore();
        });
        },
      ]);

    window.angular.element(document).ready(() => {
      window.angular.bootstrap(window.angular.element('#angular-JSONP-fallback'), ['angularJSONPFallback']);
    });
  });

  test('AngularJS module timeout', t => {
    t.plan(4);
    let requestTimeout = 1000;

    let fauxJax = require('faux-jax');
    let parse = require('url-parse');

    let currentURL = parse(location.href);

    // load AngularJS Algolia Search module
    require('../../../src/browser/builds/algoliasearch.angular');

    window.angular
      .module('angularTimeout', ['algoliasearch'])
      .controller('AngularModuleSearchControllerTestTimeout', [
        '$scope',
        '$timeout',
        'algolia',
        function($scope, $timeout, algolia) {
          t.pass('AngularJS controller initialized');
          var client = algolia.Client(
            'angularTimeoutAPPID',
            'angularTimeoutKEY',
            {
              hosts: [currentURL.host, currentURL.host],
              timeout: requestTimeout,
            }
          );
          let index = client.initIndex('simple-JSONP-response');
          fauxJax.install();

          index.search('angular-first').then((content) => {
          fauxJax.restore();

          t.deepEqual(
            content, {
              message: 'YEAH!'
            },
            'Content matches'
          );
        });

          fauxJax.waitFor(2, (err, requests) => {
          t.error(err);
          t.equal(2, requests.length, 'Two requests made');

          $timeout(function() {
            requests[1].respond(200, {}, JSON.stringify({message: 'YEAH!'}));
          }, requestTimeout / 2);
        });
        },
      ]);

    window.angular.element(document).ready(() => {
      window.angular.bootstrap(window.angular.element('#angular-timeout'), ['angularTimeout']);
    });
  });

  test('AngularJS module withCredentials', t => {
    let fauxJax = require('faux-jax');

    if (!fauxJax.support.xhr.cors) {
      t.plan(1);
      // IE9 has XHR but no cors, skip this test
      t.pass(
        'skipping this test for browsers not using CORS, unneeded and false positive'
      );
      return;
    }

    t.plan(2);

    // load AngularJS Algolia Search module
    require('../../../src/browser/builds/algoliasearch.angular');

    window.angular
      .module('angularWithCredentials', ['algoliasearch'])
      .config([
        '$httpProvider',
        function($httpProvider) {
          $httpProvider.defaults.withCredentials = true;
        },
      ])
      .controller('AngularModuleSearchControllerTestWithCredentials', [
        'algolia',
        function(algolia) {
          var client = algolia.Client(
            'angularWithCredentialsAPPID',
            'angularWithCredentialsKEY'
          );
          let index = client.initIndex('angularWithCredentialsINDEX');
          fauxJax.install();

          index.search(() => {
          t.pass();
          fauxJax.restore();
        });

          fauxJax.once('request', (request) => {
          t.equal(
            request.withCredentials,
            false,
            'withCredentials if false even if $http set it to true'
          );

          request.respond(200, {}, '{}');
        });
        },
      ]);

    window.angular.element(document).ready(() => {
      window.angular.bootstrap(window.angular.element('#angular-with-credentials'), ['angularWithCredentials']);
    });
  });

  test('AngularJS module $http.defaults.headers.common set', t => {
    let fauxJax = require('faux-jax');
    t.plan(2);

    // load AngularJS Algolia Search module
    require('../../../src/browser/builds/algoliasearch.angular');

    window.angular
      .module('angularUsingHttpsDefaults', ['algoliasearch'])
      .config([
        '$httpProvider',
        function($httpProvider) {
          $httpProvider.defaults.headers.common = {
            'X-Requested-With': 'a browser',
            'X-CSRF-Token': 'SEKRET!',
          };
        },
      ])
      .controller('AngularModuleSearchControllerTestUsingHttpsDefaults', [
        'algolia',
        function(algolia) {
          var client = algolia.Client(
            'angularUsingHttpsDefaultsAPPID',
            'angularUsingHttpsDefaultsKEY'
          );
          let index = client.initIndex('angularUsingHttpsDefaultsINDEX');
          fauxJax.install();

          index.search(() => {
          t.pass();
          fauxJax.restore();
        });

          fauxJax.once('request', (request) => {
          t.deepEqual(
            request.requestHeaders, {
              'content-type': 'application/x-www-form-urlencoded',
              accept: 'application/json'
            },
            'requestHeaders matches'
          );

          request.respond(200, {}, '{}');
        });
        },
      ]);

    window.angular.element(document).ready(() => {
      window.angular.bootstrap(window.angular.element('#angular-using-https-defaults'), ['angularUsingHttpsDefaults']);
    });
  });

  test('AngularJS module cache', t => {
    t.plan(3);

    let fauxJax = require('faux-jax');

    // load AngularJS Algolia Search module
    require('../../../src/browser/builds/algoliasearch.angular');

    window.angular
      .module('angularCache', ['algoliasearch'])
      .controller('AngularModuleSearchControllerTestCache', [
        '$scope',
        '$timeout',
        'algolia',
        function($scope, $timeout, algolia) {
          t.pass('AngularJS controller initialized');
          var client = algolia.Client('angularCacheAPPID', 'angularCacheKEY');
          let index = client.initIndex('angularCacheINDEX');
          fauxJax.install();

          // careful, cannot use .catch here, will throw in IE8
          // even if this test does not run on IE8, it's still parsed
          index.search('SMG');

          fauxJax.once('request', (request) => {
          request.respond(200, {}, JSON.stringify({good: 'Morning'}));

          index.search('SMG', searchDone);

          fauxJax.restore();
        });

          function searchDone(err, res) {
            t.error(err);
            t.deepEqual(res, {
              good: 'Morning',
            });
          }
        },
      ]);

    window.angular.element(document).ready(() => {
      window.angular.bootstrap(window.angular.element('#angular-test-cache'), ['angularCache']);
    });
  });
}
