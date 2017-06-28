'use strict';

const test = require('tape');

test('client.setExtraHeader(key, value)', t => {
  t.plan(4);

  const fauxJax = require('faux-jax');
  const parse = require('url-parse');

  const createFixture = require('../../../utils/create-fixture');
  const fixture = createFixture();
  const client = fixture.client;
  const index = fixture.index;

  fauxJax.install({ gzip: true });

  // no extra header set
  index.search('first');

  client.setExtraHeader('X-great-header', 'yay');

  // extra header set
  index.search('second');

  client.setExtraHeader('X-great-header', 'yaw');

  // extra header set
  index.search('third');

  fauxJax.waitFor(3, (err, requests) => {
    t.error(err);
    fauxJax.restore();

    const firstRequest = requests[0];
    const secondRequest = requests[1];
    const thirdRequest = requests[2];

    firstRequest.respond(200, {}, '{}');
    secondRequest.respond(200, {}, '{}');
    thirdRequest.respond(200, {}, '{}');

    if (process.browser) {
      t.notOk(
        parse(firstRequest.requestURL, true).query['x-great-header'],
        'No `X-great-header` set on first request'
      );

      t.equal(
        parse(secondRequest.requestURL, true).query['x-great-header'],
        'yay',
        '`X-great-header` set on second request'
      );

      t.equal(
        parse(thirdRequest.requestURL, true).query['x-great-header'],
        'yaw',
        '`X-great-header` set on third request'
      );
    } else {
      t.notOk(
        firstRequest.requestHeaders['x-great-header'],
        'No `X-great-header` set on first request'
      );

      t.equal(
        secondRequest.requestHeaders['x-great-header'],
        'yay',
        '`X-great-header` set on second request'
      );

      t.equal(
        thirdRequest.requestHeaders['x-great-header'],
        'yaw',
        '`X-great-header` set on third request'
      );
    }
  });
});
