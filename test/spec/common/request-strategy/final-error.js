'use strict';

var test = require('tape');

test('We receive a specific error message when everything failed', function(t) {
  t.plan(2);

  var fauxJax = require('faux-jax');

  var hosts = [];

  if (process.browser) {
    var parse = require('url-parse');
    // we do not use a random url, we want to reach the JSONP local server
    var currentURL = parse(location.href);
    hosts.push(currentURL.host);
  } else {
    hosts.push('www.d21d98uasdklj1289duasdkjs98dasuda.com');
  }

  var createFixture = require('../../../utils/create-fixture');
  var fixture = createFixture({
    clientOptions: {
      hosts: hosts,
      timeout: 6000
    },
    indexName: 'JSONP-500-error'
  });
  var index = fixture.index;

  var expectedError = 'Cannot connect to the AlgoliaSearch API.' +
    ' Send an email to support@algolia.com to report and resolve the issue.' +
    ' Application id was: ' + fixture.credentials.applicationID;

  fauxJax.install();

  fauxJax.on('request', function serverError(req) {
    req.respond(
      500, {}, JSON.stringify({
        status: 500,
        message: 'Nooooooo'
      })
    );
  });

  index.search('something', function(err) {
    t.ok(err instanceof Error, 'we received an error');
    t.equal(err.message, expectedError, 'we received the right error message');
    fauxJax.restore();
  });
});
