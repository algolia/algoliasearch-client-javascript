'use strict';

const test = require('tape');

test('Bad JSON is catched', t => {
  t.plan(2);

  const fauxJax = require('faux-jax');

  const createFixture = require('../../../utils/create-fixture');
  const fixture = createFixture();
  const index = fixture.index;

  fauxJax.install({ gzip: true });

  fauxJax.once('request', req => {
    req.respond(200, {}, 'OMGBADJSON;;;;;"');
    fauxJax.restore();
  });

  index.search('something', err => {
    t.ok(err instanceof Error);
    t.equal(
      err.message,
      'Could not parse the incoming response as JSON, see err.more for details'
    );
  });
});
