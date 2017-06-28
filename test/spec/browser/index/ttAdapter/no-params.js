'use strict';

const test = require('tape');

test('index.ttAdapter(cb)', t => {
  t.plan(1);

  const fauxJax = require('faux-jax');

  const createFixture = require('../../../../utils/create-fixture');
  const fixture = createFixture();

  const fakeResponse = {
    hits: [1, 2, 3],
  };
  const index = fixture.index;
  const ttAdapter = index.ttAdapter();

  fauxJax.install();

  fauxJax.on('request', req => {
    fauxJax.restore();
    req.respond(200, {}, JSON.stringify(fakeResponse));
  });

  ttAdapter('a search', actualHits => {
    t.deepEqual(actualHits, fakeResponse.hits, 'We received some hits');
  });
});
