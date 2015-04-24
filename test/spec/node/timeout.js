var test = require('tape');

test('Default request timeout is approx 3s', function(t) {
  t.plan(3);
  var fauxJax = require('faux-jax');

  var createFixture = require('../../utils/create-fixture');
  var fixture = createFixture();
  var index = fixture.index;

  fauxJax.install();

  var start = Date.now();
  fauxJax.waitFor(2, function(err, requests) {
    t.error(err, 'We got two requests');

    var elapsed = Math.round((Date.now() - start) / 1000);
    requests[1].respond(200, {}, '{"timeout": "ok"}');
    fauxJax.restore();
    t.equal(elapsed, 3, 'Default request READ timeout is approximately 3s');
  });

  index.search('dsads').then(function(content) {
    t.deepEqual(content, {
      timeout: 'ok'
    }, 'content matches');

  }).catch(t.fail.bind(t));
});
