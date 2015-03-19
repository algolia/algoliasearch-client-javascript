var test = require('tape');

test('Request strategy does not fallback to JSONP', function(t) {
  noJSONP(t, 404);
  noJSONP(t, 101);
});

function noJSONP(t, statusCode) {
  t.test('=> when statusCode is ' + statusCode, function(t) {
    t.plan(3);
    var fauxJax = require('faux-jax');
    var parse = require('url-parse');
    var sinon = require('sinon');

    var createFixture = require('../../utils/create-fixture');

    var currentURL = parse(location.href);
    var fixture = createFixture({
      // if JSONP was used, this would call this
      // url and we would get a response
      indexName: 'simple-JSONP-response'
    });

    var index = fixture.index;

    function searchCallback(err) {
      t.equal(
        fauxJax.requests.length,
        1,
        'One request done'
      );

      fauxJax.restore();

      t.ok(err instanceof Error, 'err is an Error');
      t.equal(err.message, 'No JSONP when ' + statusCode, 'Error message matches');
    };

    fauxJax.install();

    index.search('No JSONP when ' +  statusCode, searchCallback);

    fauxJax.requests[0]
      .respond(statusCode, {}, JSON.stringify({
        message: 'No JSONP when ' + statusCode,
        status: statusCode
      }));
  });
}
