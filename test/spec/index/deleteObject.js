var test = require('tape');

test('deleteObject()', function(t) {
  t.plan(2);
  var createFixture = require('../../utils/create-fixture');
  var fixture = createFixture();
  var index = fixture.index;

  index.deleteObject().then(t.fail.bind(t), function(err) {
    t.ok(err instanceof Error);
    t.equal(
      err.message,
      'Cannot delete an object without an objectID'
    );
  });
});

test('deleteObject(cb)', function(t) {
  t.plan(2);
  var createFixture = require('../../utils/create-fixture');
  var fixture = createFixture();
  var index = fixture.index;

  index.deleteObject(function(err) {
    t.ok(err instanceof Error);
    t.equal(
      err.message,
      'Cannot delete an object without an objectID'
    );
  });
});
