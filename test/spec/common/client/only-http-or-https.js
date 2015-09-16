'use strict';

var test = require('tape');

test('we only talk http or https', function(t) {
  t.plan(3);
  var bind = require('lodash/function/bind');

  var algoliasearch = require('../../../../');

  var http = bind(algoliasearch, null, 'applicationID', 'apiKey', {
    protocol: 'http:'
  });

  var https = bind(algoliasearch, null, 'applicationID', 'apiKey', {
    protocol: 'https:'
  });

  var blurb = bind(algoliasearch, null, 'applicationID', 'apiKey', {
    protocol: 'blurb:'
  });

  t.doesNotThrow(http, 'http protocol is ok');
  t.doesNotThrow(https, 'https protocol is ok');
  t.throws(blurb, Error, 'blurb protocol fails');
});
