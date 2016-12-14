'use strict';

var test = require('tape');

test('Request timeout is used', function(t) {
  t.plan(3);
  var fauxJax = require('faux-jax');

  var createFixture = require('../../utils/create-fixture');
  var fixture = createFixture({
    clientOptions: {
      timeout: 500
    }
  });
  var index = fixture.index;

  fauxJax.install({gzip: true});

  var start = Date.now();
  fauxJax.waitFor(2, function(err, requests) {
    t.error(err, 'We got two requests');

    var elapsed = Math.round((Date.now() - start) / 1000);
    requests[1].respond(200, {}, '{"timeout": "ok"}');
    fauxJax.restore();
    t.equal(elapsed, 1, 'Two requests made in 500ms since timeout of 500ms asked');
  });

  index.search('dsads').then(function(content) {
    t.deepEqual(content, {
      timeout: 'ok'
    }, 'content matches');
  }).catch(t.fail.bind(t));
});
