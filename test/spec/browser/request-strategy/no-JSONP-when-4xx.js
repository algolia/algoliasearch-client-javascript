'use strict';

const test = require('tape');

test('Request strategy does not fallback to JSONP', t => {
  noJSONP(t, 404);
});

function noJSONP(mainTest, statusCode) {
  mainTest.test(`=> when statusCode is ${statusCode}`, t => {
    t.plan(2);
    const fauxJax = require('faux-jax');

    const createFixture = require('../../../utils/create-fixture');

    const fixture = createFixture({
      // if JSONP was used, this would call this
      // url and we would get a response
      indexName: 'simple-JSONP-response',
    });

    const index = fixture.index;

    function searchCallback(err) {
      fauxJax.restore();

      t.ok(err instanceof Error, 'err is an Error');
      t.equal(
        err.message,
        `No JSONP when ${statusCode}`,
        'Error message matches'
      );
    }

    fauxJax.install();

    index.search(`No JSONP when ${statusCode}`, searchCallback);

    fauxJax.once('request', req => {
      req.respond(
        statusCode,
        {},
        JSON.stringify({
          message: `No JSONP when ${statusCode}`,
          status: statusCode,
        })
      );
    });
  });
}
