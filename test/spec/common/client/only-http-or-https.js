'use strict';

const test = require('tape');

test('we only talk http or https', t => {
  t.plan(3);
  const bind = require('lodash-compat/function/bind');

  const algoliasearch = require('../../../../');

  const http = bind(algoliasearch, null, 'applicationID', 'apiKey', {
    protocol: 'http:',
  });

  const https = bind(algoliasearch, null, 'applicationID', 'apiKey', {
    protocol: 'https:',
  });

  const blurb = bind(algoliasearch, null, 'applicationID', 'apiKey', {
    protocol: 'blurb:',
  });

  t.doesNotThrow(http, 'http protocol is ok');
  t.doesNotThrow(https, 'https protocol is ok');
  t.throws(blurb, Error, 'blurb protocol fails');
});
