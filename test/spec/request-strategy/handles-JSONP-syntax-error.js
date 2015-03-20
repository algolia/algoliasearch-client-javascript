var test = require('tape');

test('Request strategy handles JSONP syntax errors', function(t) {
  t.plan(8);
  var fauxJax = require('faux-jax');
  var parse = require('url-parse');
  var xhr = require('xhr');

  var createFixture = require('../../utils/create-fixture');

  var currentURL = parse(location.href);
  var fixture = createFixture({
    clientOptions: {
      hosts: [
        currentURL.host,
        currentURL.host
      ],
      timeout: 5000
    },
    indexName: 'JSONP-syntax-error'
  });

  function searchCallback(err) {
    t.equal(
      fauxJax.requests.length,
      1,
      'Still oneXHR done'
    );

    fauxJax.restore();

    t.ok(err instanceof Error);
    t.equal(
      err.message,
      'Cannot connect to the AlgoliaSearch API. Send an email to support@algolia.com to report and resolve the issue.',
      'Error message matches'
    );

    checkNbCalls();
  }

  var index = fixture.index;

  xhr({
    uri: '/1/indexes/JSONP-syntax-error/reset',
    json: true
  }, function run(err, res, body) {
    t.error(err, 'No error while calling /1/indexes/JSONP-syntax-error/reset');
    t.deepEqual(body, {calls: 0}, 'No JSONP calls done');

    fauxJax.install();

    index.search('JSONP Failure', searchCallback);

    setTimeout(function() {
      t.equal(
        fauxJax.requests.length,
        1,
        'One request made'
      );

      // hacky way to simulate a network error so that we try JSONP
      fauxJax.requests[0].onerror();
    }, 200);
  });

  function checkNbCalls() {
    xhr({
      uri: '/1/indexes/JSONP-syntax-error/calls',
      json: true
    }, function run(err, res, body) {
      t.error(err, 'No error while calling /1/indexes/JSONP-syntax-error/calls');
      t.deepEqual(body, {calls: 2}, 'Two JSONP calls done, we have two hosts');
    });
  }
});
