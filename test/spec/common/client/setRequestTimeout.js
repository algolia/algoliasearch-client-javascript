'use strict';

var test = require('tape');

test('client.setRequestTimeout()', function(t) {
  t.plan(5);

  var fauxJax = require('faux-jax');

  var createFixture = require('../../../utils/create-fixture');

  var hosts = [];

  if (process.browser) {
    var parse = require('url-parse');
    // we do not use a random url, we want to reach the JSONP local server
    var currentURL = parse(location.href);
    hosts.push(currentURL.host);
  } else {
    hosts.push('www.d21d98uasdklj1289duasdkjs98dasuda.com');
  }

  var requestTimeout = 1000;
  var fixture = createFixture({
    clientOptions: {
      timeout: requestTimeout,
      hosts: hosts
    },
    indexName: 'blackhole'
  });

  var expectedTimeout = requestTimeout;
  if (process.browser) {
    // AJAX + JSONP timeout
    expectedTimeout = expectedTimeout * 2;
  }

  fauxJax.install();

  var client = fixture.client;
  var index = fixture.index;
  var start;

  start = (new Date()).getTime();
  index.search('jaja', firstSearch);

  function firstSearch(err) {
    t.ok(err instanceof Error);
    t.equal(
      err.message,
      'Request timedout before getting a response',
      'Error message id descriptive'
    );

    var end = (new Date()).getTime();
    t.ok(
      end - start >= expectedTimeout,
      'We waited longer than the request timeout'
    );

    // now let's double the initial timeout
    client.setRequestTimeout(requestTimeout * 2);

    start = (new Date()).getTime();
    index.search('yoyo', secondSearch);
  }

  fauxJax.on('request', function() {});

  function secondSearch(err) {
    t.ok(err instanceof Error);

    var end = (new Date()).getTime();

    t.ok(
      end - start >= expectedTimeout * 2,
      'We waited longer than the request timeout * 2'
    );

    fauxJax.restore();
  }
});
