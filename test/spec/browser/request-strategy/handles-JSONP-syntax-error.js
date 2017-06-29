'use strict';

let test = require('tape');

const browser = require('bowser');

if (browser.name === 'PhantomJS') {
  // cannot be tested in PhantomJS, it throws a uncatchable
  // SyntaxError
  test = test.skip;
}

test('Request strategy handles JSONP syntax errors', t => {
  t.plan(8);
  const fauxJax = require('faux-jax');
  const parse = require('url-parse');
  const xhr = require('xhr');

  const createFixture = require('../../../utils/create-fixture');

  const currentURL = parse(location.href);
  const fixture = createFixture({
    clientOptions: {
      hosts: [currentURL.host, currentURL.host],
      timeout: 5000,
    },
    indexName: 'JSONP-syntax-error',
  });

  function searchCallback(err) {
    fauxJax.restore();

    t.ok(err instanceof Error);
    t.equal(
      err.message,
      '<script> was loaded but did not call our provided callback',
      'Error message matches'
    );

    checkNbCalls();
  }

  const index = fixture.index;

  xhr(
    {
      uri: '/1/indexes/JSONP-syntax-error/reset',
      json: true,
    },
    (err, res, body) => {
      t.error(
        err,
        'No error while calling /1/indexes/JSONP-syntax-error/reset'
      );
      t.deepEqual(body, { calls: 0 }, 'No JSONP calls done');

      fauxJax.install();

      index.search('JSONP Failure', searchCallback);

      fauxJax.on('request', req => {
        // we should pass here as much time as the number of hosts (2)
        t.pass();
        // simulate network error
        req.onerror();
      });
    }
  );

  function checkNbCalls() {
    xhr(
      {
        uri: '/1/indexes/JSONP-syntax-error/calls',
        json: true,
      },
      (err, res, body) => {
        t.error(
          err,
          'No error while calling /1/indexes/JSONP-syntax-error/calls'
        );
        t.deepEqual(
          body,
          { calls: 2 },
          'Two JSONP calls done, we have two hosts'
        );
      }
    );
  }
});
