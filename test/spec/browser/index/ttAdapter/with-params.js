'use strict';

const test = require('tape');

test('index.ttAdapter(params, cb)', t => {
  t.plan(2);

  const fauxJax = require('faux-jax');

  const createFixture = require('../../../../utils/create-fixture');
  const fixture = createFixture();

  const index = fixture.index;
  const fakeResponse = {
    hits: [1, 2, 3],
  };
  const ttAdapter = index.ttAdapter({
    hitsPerPage: 200,
  });

  fauxJax.install();

  fauxJax.on('request', req => {
    fauxJax.restore();
    t.equal(
      req.requestBody,
      JSON.stringify({ params: 'query=a%20search&hitsPerPage=200' }),
      'We set a specific `hitsPerPage` when searching'
    );
    req.respond(200, {}, JSON.stringify(fakeResponse));
  });

  ttAdapter('a search', actualHits => {
    t.deepEqual(actualHits, fakeResponse.hits, 'We received some hits');
  });
});
