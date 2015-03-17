var test = require('tape');

var browser = require('bowser').browser;

// run AngularJS test on all browsers but IE < 9
// https://docs.angularjs.org/guide/ie
if (!browser.msie || parseFloat(browser.version) > 8) {
  test('AngularJS module success case', function(t) {
    t.plan(9);

    var fauxJax = require('faux-jax');
    var parse = require('url-parse');

    // load AngularJS Algolia Search module
    require('../../src/algoliasearch.angular');

    global.angular
      .module('angularTestSuccess', ['algoliasearch'])
      .controller('AngularModuleSearchControllerTestSuccess', ['$scope', '$timeout', 'algolia', function($scope, $timeout, algolia) {
        t.pass('AngularJS controller initialized');
        var client = algolia.Client('AngularJSSuccess', 'ROCKSSuccess');
        var index = client.initIndex('googleSuccess');
        fauxJax.install();

        t.equal(
          0,
          fauxJax.requests.length,
          'No request made'
        );

        index.search('SMG').then(function searchDone(content) {
          t.deepEqual(content, {
            'YAW': 'angular-promise'
          });
        });

        index.search('BOUM', function searchDone(err, content) {
          t.error(err, 'No error while using the AngularJS module');
          t.deepEqual(content, {
            'YAW': 'angular-cb'
          });
        });


        $timeout(function(){
          t.equal(
            2,
            fauxJax.requests.length,
            'Two requests made'
          );

          var firstRequest = fauxJax.requests[0];
          var secondRequest = fauxJax.requests[1];
          var requestURL = parse(firstRequest.requestURL, true);

          t.equal(
            requestURL.host,
            'angularjssuccess-dsn.algolia.net',
            'requestURL host matches'
          );

          t.equal(
            requestURL.pathname,
            '/1/indexes/googleSuccess/query',
            'requestURL pathname matches'
          );

          t.deepEqual(
            requestURL.query, {
              'X-Algolia-API-Key': 'ROCKSSuccess',
              'X-Algolia-Application-Id': 'AngularJSSuccess'
            },
            'requestURL query matches'
          );

          firstRequest.respond(
            200,
            {},
            JSON.stringify({
              'YAW': 'angular-promise'
            })
          );

          secondRequest.respond(
            200,
            {},
            JSON.stringify({
              'YAW': 'angular-cb'
            })
          );

          fauxJax.restore();
        });
      }]);

    // we manually bootstrap our application
    // we cannot use ng-app in the test/template.html
    // otherwise angular tries to initialize the app as soon as domready
    // and the required angular module (`angularTest`) is not yet loaded
    global.angular.element(document).ready(function() {
      global.angular.bootstrap(global.angular.element('#angular-test-success'), ['angularTestSuccess']);
    });
  });

  // broken, need to switch jsonp based on an option directly from the jsonRequest() call
  // to be able to:
  //  1. do JSONP fallback even with promises
  //  1. stop JSONP fallback from runing after promise was rejected because no retry (4xx)
  test('AngularJS module error case', function(t) {
    t.plan(5);

    var fauxJax = require('faux-jax');

    // load AngularJS Algolia Search module
    require('../../src/algoliasearch.angular');

    global.angular
      .module('angularTestError', ['algoliasearch'])
      .controller('AngularModuleSearchControllerTestError', ['$scope', '$timeout', 'algolia', function($scope, $timeout, algolia) {
        t.pass('AngularJS controller initialized');
        var client = algolia.Client('AngularJSError', 'ROCKSError');
        var index = client.initIndex('googleError');
        fauxJax.install();

        // careful, cannot use .catch here, will throw in IE8
        // even if this test does not run on IE8, it's still parsed
        index.search('SMG').then(null, function searchDone(err) {
          t.equal(
            err.message,
            'Nope promise',
            'Error message matches'
          );
          t.ok(err instanceof Error, 'Promise was rejected');
        });

        index.search('BOUM', function searchDone(err) {
          t.equal(
            err.message,
            'Nope callback',
            'Error message matches'
          );
          t.ok(err instanceof Error, 'Callback first argument is an `Error`');
        });

        $timeout(function() {
          fauxJax.requests[0].respond(400, {}, JSON.stringify({message: 'Nope promise'}));
          fauxJax.requests[1].respond(400, {}, JSON.stringify({message: 'Nope callback'}));
          fauxJax.restore();
        });
      }]);

    // we manually bootstrap our application
    // we cannot use ng-app in the test/template.html
    // otherwise angular tries to initialize the app as soon as domready
    // and the required angular module (`angularTestError`) is not yet loaded
    global.angular.element(document).ready(function() {
      global.angular.bootstrap(global.angular.element('#angular-test-error'), ['angularTestError']);
    });
  });

  test('AngularJS module JSONP fallback', function(t) {
    t.plan(4);

    var fauxJax = require('faux-jax');
    var parse = require('url-parse');

    var currentURL = parse(location.href);

    // load AngularJS Algolia Search module
    require('../../src/algoliasearch.angular');

    global.angular
      .module('angularJSONPFallback', ['algoliasearch'])
      .controller('AngularModuleSearchControllerTestJSONPFallback', ['$scope', '$timeout', 'algolia', function($scope, $timeout, algolia) {
        t.pass('AngularJS controller initialized');
        var client = algolia.Client('AngularJSError', 'ROCKSError', {
          hosts: [
            currentURL.host
          ],
          timeout: 5000
        });
        var index = client.initIndex('simple-JSONP-response');
        fauxJax.install();

        index.search('angular-first').then(function searchDone(content) {
          t.deepEqual(
            content, {
              query: 'angular-first'
            },
            'Content matches'
          );
        });

        index.search('angular-second', function searchDone(err, content) {
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

        $timeout(function() {
          fauxJax.requests[0].respond(500, {}, JSON.stringify({message: 'Nope promise'}));
          fauxJax.requests[1].respond(500, {}, JSON.stringify({message: 'Nope callback'}));
          fauxJax.restore();
        });
      }]);

    // we manually bootstrap our application
    // we cannot use ng-app in the test/template.html
    // otherwise angular tries to initialize the app as soon as domready
    // and the required angular module (`angularJSONPFallback`) is not yet loaded
    global.angular.element(document).ready(function() {
      global.angular.bootstrap(global.angular.element('#angular-JSONP-fallback'), ['angularJSONPFallback']);
    });
  });
}
