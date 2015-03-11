var test = require('tape');

test('algoliasearch.helper(client, indexName)', function(t) {
  var bind = require('lodash-compat/function/bind');

  var algoliasearch = require('../../');

  var client = algoliasearch('das', 'fsa');

  t.doesNotThrow(
    bind(algoliasearch.helper, null, client, 'soüperIndex'),
    'We can use algoliasearch.helper()'
  );

  t.end();
});
