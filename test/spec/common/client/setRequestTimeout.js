'use strict';

const test = require('tape');

test('client.setRequestTimeout()', t => {
  t.plan(5);

  const fauxJax = require('faux-jax');

  const createFixture = require('../../../utils/create-fixture');

  const hosts = [];

  if (process.browser) {
    const parse = require('url-parse');
    // we do not use a random url, we want to reach the JSONP local server
    const currentURL = parse(location.href);
    hosts.push(currentURL.host);
  } else {
    hosts.push('www.d21d98uasdklj1289duasdkjs98dasuda.com');
  }

  const requestTimeout = 1000;
  const fixture = createFixture({
    clientOptions: {
      timeout: requestTimeout,
      hosts,
    },
    indexName: 'blackhole',
  });

  let expectedTimeout = requestTimeout;
  if (process.browser) {
    // AJAX + JSONP timeout
    expectedTimeout = expectedTimeout * 2;
  }

  fauxJax.install({ gzip: true });

  const client = fixture.client;
  const index = fixture.index;
  let start;

  start = new Date().getTime();
  index.search('jaja', firstSearch);

  function firstSearch(err) {
    t.ok(err instanceof Error);
    t.equal(
      err.message,
      'Request timedout before getting a response',
      'Error message id descriptive'
    );

    const end = new Date().getTime();
    t.ok(
      end - start >= expectedTimeout,
      'We waited longer than the request timeout'
    );

    // now let's double the initial timeout
    client.setRequestTimeout(requestTimeout * 2);

    start = new Date().getTime();
    index.search('yoyo', secondSearch);
  }

  fauxJax.on('request', () => {});

  function secondSearch(err) {
    t.ok(err instanceof Error);

    const end = new Date().getTime();

    t.ok(
      end - start >= expectedTimeout * 2,
      'We waited longer than the request timeout * 2'
    );

    fauxJax.restore();
  }
});
