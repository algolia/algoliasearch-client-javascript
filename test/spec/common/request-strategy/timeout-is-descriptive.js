'use strict';

const test = require('tape');

test('when a timeout occurs, we get a descriptive error', t => {
  t.plan(3);

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
      timeout: 50,
      hosts,
    },
    indexName: 'blackhole',
  });

  const index = fixture.index;

  fauxJax.install({ gzip: true });
  fauxJax.on('request', () => {});

  index.search('something', err => {
    fauxJax.restore();
    t.ok(err instanceof Error, 'We got an error');

    t.equal(err.name, 'AlgoliaSearchRequestTimeoutError', 'error name matches');

    t.equal(
      err.message,
      'Request timedout before getting a response',
      'error messag ematches'
    );
  });
});
