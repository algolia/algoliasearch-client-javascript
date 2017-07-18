'use strict';

var test = require('tape');

test('client.setExtraHeader(key, value)', function(t) {
  t.plan(8);

  var fauxJax = require('faux-jax');
  var parse = require('url-parse');

  var createFixture = require('../../../utils/create-fixture');
  var fixture = createFixture();
  var client = fixture.client;
  var index = fixture.index;

  fauxJax.install({gzip: true});

  // no extra header set
  index.search('first');

  client.setExtraHeader('X-great-header', 'yay');

  t.equal(
    client.getExtraHeader('X-great-header'),
    'yay',
    'The `X-great-header` is set on the first search'
  );

  // extra header set
  index.search('second');

  client.setExtraHeader('X-great-header', 'yaw');

  t.equal(
    client.getExtraHeader('X-great-header'),
    'yaw',
    'The `X-great-header` is set on the second search'
  );

  // extra header set
  index.search('third');

  client.unsetExtraHeader('X-great-header');

  t.notOk(
    client.getExtraHeader('X-great-header'),
    'No `X-great-header` set on fourth search'
  );

  // extra header removed
  index.search('fourth');

  fauxJax.waitFor(4, function(err, requests) {
    t.error(err);
    fauxJax.restore();

    var firstRequest = requests[0];
    var secondRequest = requests[1];
    var thirdRequest = requests[2];
    var fourthRequest = requests[3];

    firstRequest.respond(200, {}, '{}');
    secondRequest.respond(200, {}, '{}');
    thirdRequest.respond(200, {}, '{}');
    fourthRequest.respond(200, {}, '{}');

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

      t.notOk(
        parse(fourthRequest.requestURL, true).query['x-great-header'],
        'No `X-great-header` set on fourth request'
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

      t.notOk(
        fourthRequest.requestHeaders['x-great-header'],
        'No `X-great-header` set on fourth request'
      );
    }
  });
});
