'use strict';

var test = require('tape');

test('Request strategy does not fallback to JSONP', function(t) {
  noJSONP(t, 404);
  noJSONP(t, 101);
});

function noJSONP(mainTest, statusCode) {
  mainTest.test('=> when statusCode is ' + statusCode, function(t) {
    t.plan(2);
    var fauxJax = require('faux-jax');

    var createFixture = require('../../../utils/create-fixture');

    var fixture = createFixture({
      // if JSONP was used, this would call this
      // url and we would get a response
      indexName: 'simple-JSONP-response'
    });

    var index = fixture.index;

    function searchCallback(err) {
      fauxJax.restore();

      t.ok(err instanceof Error, 'err is an Error');
      t.equal(err.message, 'No JSONP when ' + statusCode, 'Error message matches');
    }

    fauxJax.install();

    index.search('No JSONP when ' + statusCode, searchCallback);

    fauxJax.once('request', function(req) {
      req.respond(statusCode, {}, JSON.stringify({
        message: 'No JSONP when ' + statusCode,
        status: statusCode
      }));
    });
  });
}
