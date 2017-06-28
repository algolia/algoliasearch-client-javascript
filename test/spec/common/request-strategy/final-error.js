'use strict';

const test = require('tape');

test('We receive a specific error message when everything failed', t => {
  t.plan(2);

  const fauxJax = require('faux-jax');

  const hosts = [];

  if (process.browser) {
    const parse = require('url-parse');
    // we do not use a random url, we want to reach the JSONP local server
    const currentURL = parse(location.href);
    hosts.push(currentURL.host);
  } else {
    hosts.push('www.d21d98uasdklj1289duasdkjs98dasuda.com');
  }

  const createFixture = require('../../../utils/create-fixture');
  const fixture = createFixture({
    clientOptions: {
      hosts,
      timeout: 6000,
    },
    indexName: 'JSONP-500-error',
  });
  const index = fixture.index;

  const expectedError = `${'Cannot connect to the AlgoliaSearch API.' +
    ' Send an email to support@algolia.com to report and resolve the issue.' +
    ' Application id was: '}${fixture.credentials.applicationID}`;

  fauxJax.install({ gzip: true });

  fauxJax.on('request', req => {
    req.respond(
      500,
      {},
      JSON.stringify({
        status: 500,
        message: 'Nooooooo',
      })
    );
  });

  index.search('something', err => {
    t.ok(err instanceof Error, 'we received an error');
    t.equal(err.message, expectedError, 'we received the right error message');
    fauxJax.restore();
  });
});
