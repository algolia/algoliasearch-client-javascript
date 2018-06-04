'use strict';

var test = require('tape');

test('when a timeout occurs, we get a descriptive error', function(t) {
  t.plan(3);

  var fauxJax = require('faux-jax');

  var hosts = [];
  var protocol = 'https:';

  if (process.browser) {
    var parse = require('url-parse');
    // we do not use a random url, we want to reach the JSONP local server
    var currentURL = parse(location.href);
    hosts.push(currentURL.host);
    protocol = currentURL.protocol;
  } else {
    hosts.push('www.d21d98uasdklj1289duasdkjs98dasuda.com');
  }

  var createFixture = require('../../../utils/create-fixture');
  var fixture = createFixture({
    clientOptions: {
      timeout: 50,
      hosts: hosts,
      protocol: protocol
    },
    indexName: 'blackhole'
  });

  var index = fixture.index;

  fauxJax.install({gzip: true});
  fauxJax.on('request', function() {});

  index.search('something', function(err) {
    fauxJax.restore();
    t.ok(err instanceof Error, 'We got an error');

    t.equal(
      err.name,
      'AlgoliaSearchRequestTimeoutError',
      'error name matches'
    );

    t.equal(
      err.message,
      'Request timedout before getting a response',
      'error messag ematches'
    );
  });
});
