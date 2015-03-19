var test = require('tape');

test('Request strategy does not fallback to JSONP', function(t) {
  noJSONP(t, 404);
});

function noJSONP(mainTest, statusCode) {
  mainTest.test('=> when statusCode is ' + statusCode, function(t) {
    t.plan(3);
    var fauxJax = require('faux-jax');

    var createFixture = require('../../utils/create-fixture');

    var fixture = createFixture({
      // if JSONP was used, this would call this
      // url and we would get a response
      indexName: 'simple-JSONP-response'
    });

    var index = fixture.index;

    function searchCallback(success, content) {
      t.equal(
        fauxJax.requests.length,
        1,
        'One request done'
      );

      fauxJax.restore();

      t.notOk(success, 'request failed');

      t.deepEqual(content, {
        message: 'No JSONP when ' + statusCode,
        status: statusCode
      }, 'Content matches');
    }

    fauxJax.install();

    index.search('No JSONP when ' + statusCode, searchCallback);

    fauxJax.requests[0]
      .respond(statusCode, {}, JSON.stringify({
        message: 'No JSONP when ' + statusCode,
        status: statusCode
      }));
  });
}
