'use strict';

// This is the parse cloud testing file
// It will try to communicate with the deployed test parse application
// also see scripts/test-parse

const test = require('tape');

test('parse build', t => {
  t.plan(3);

  const async = require('async');
  const request = require('superagent');

  const timestamp = Date.now();
  const query = 'Paris';

  // sometimes parse cloud sends cached responses, we can avoid
  // this by calling the same endpoint multiple times
  async.timesSeries(5, requestParse);

  function requestParse(n, next) {
    request
      .post('https://api.parse.com/1/functions/search')
      .set('x-parse-application-id', process.env.PARSE_APPLICATION_ID)
      .set('x-parse-rest-api-key', process.env.PARSE_REST_API_KEY)
      .send({
        query,
        timestamp,
      })
      .end(n === 4 ? done : next);

    const expectedResponse = `OK! Query was: ${query} @ ${timestamp} using 1.0.${process
      .env.TRAVIS_BUILD_NUMBER}`;

    function done(err, res) {
      t.error(
        err,
        'no error while contacting our newly deployed parse application'
      );
      t.equal(res.status, 200, 'status code is 200');
      t.deepEqual(
        res.body,
        {
          result: expectedResponse,
        },
        `response was ${expectedResponse}`
      );
      next();
    }
  }
});
