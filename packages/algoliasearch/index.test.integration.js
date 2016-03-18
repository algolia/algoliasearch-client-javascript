/* eslint-env mocha */

// This is the integration test suite of the JS client.
// We try to test all the major cases our clients will use, then specific method
// behaviors are tested in unit tests.
// Every test can be run separately by using it.only(). Some tests can be run
// in parallel, some cannot.

import {some} from 'lodash';
import expect from 'expect';
import parallel from 'mocha.parallel';
import algoliasearch from './index.js';

const serial = describe;
const {appId, apiKey, indexName} = process.env;
const client = algoliasearch({appId, apiKey});
const index = client.initIndex(indexName);
const objects = index.objects;

// index.delete()
before('can delete the index', () =>
  index
    .delete() // delete the index
    .then(wait(index))
    .then(() => client.listIndexes())
    .then(indexesList => // check the index is not in the list of indexes
      expect(indexesList).toExist() &&
      expect(indexesList.items).toBeAn(Array) &&
      expect(some(indexesList.items, ['name', indexName])).toBe(false)
    )
);

parallel('algoliasearch() integration suite (parallel tests)', () => {
  // client.listIndexes()
  it('can list indexes', () =>
    client
      .listIndexes()
      .then(indexesList => expect(indexesList).toExist())
  );

  // objects.save({}) without objectID + objects.get(objectID) + check index presence in list
  it('can save a single object without an objectID', () =>
    objects
      .save({method: 'objects.save({})'}) // save the object
      .then(wait(index))
      .then(res => objects.get(res.objectID))
      .then(object => expect(object.method).toBe('objects.save({})')) // check the object is here
      .then(() => client.listIndexes()) // check the index was created
      .then(indexesList => expect(some(indexesList.items, ['name', indexName])).toBe(true))
  );

  // objects.get(objectID, {attributesToRetrieve})
  it('can selectively get some attributes', () =>
    objects
      .save({objectID: 'objects.get(objectID, {attributesToRetrieve})', value: 'well', more: 'yes'})
      .then(wait(index))
      .then(() => objects
        .get('objects.get(objectID, {attributesToRetrieve})', {attributesToRetrieve: ['more']})
      )
      .then(object => expect(object).toEqual({
        objectID: 'objects.get(objectID, {attributesToRetrieve})',
        more: 'yes'
      })
    )
  );

  // objects.save([{}]) without objectID + objects.get([objectIDs])
  it('can save multiple objects without objectIDs', () =>
    objects
      .save([
        {method: 'objects.save([0])'},
        {method: 'objects.save([1])'}
      ])
      .then(wait(index))
      .then(res => objects.get(res.objectIDs))
      .then(({results: objs}) =>
        expect(objs[0].method).toBe('objects.save([0])') &&
        expect(objs[1].method).toBe('objects.save([1])')
      )
  );

  // objects.save({}) with objectID
  it('can save a single object with an objectID', () =>
    objects
      .save({objectID: 'objects.save({})', state: 'created'})
      .then(wait(index))
      .then(() => objects.get('objects.save({})'))
      .then(object => expect(object).toEqual({objectID: 'objects.save({})', state: 'created'}))
  );

  // objects.save({}) with same objectID should update
  it('can update a single object with an objectID', () =>
    objects
      .save({objectID: 'objects.save({update})', state: 'created'})
      .then(wait(index))
      .then(() => objects.get('objects.save({update})'))
      .then(object => expect(object).toEqual({
        objectID: 'objects.save({update})', state: 'created'
      }))
      .then(() =>
        objects.save({objectID: 'objects.save({update})', state: 'updated'})
      )
      .then(wait(index))
      .then(() => objects.get('objects.save({update})'))
      .then(object =>
        expect(object).toEqual({objectID: 'objects.save({update})', state: 'updated'})
      )
  );

  // objects.save([{}]) with and without objectID should create or update
  it('can update multiple objects given they exist or not, with or without objectID', () =>
    // prepare one existing object
    objects
      .save({objectID: 'objects.save([2])', state: 'created'})
      .then(wait(index))
      .then(() => objects.get('objects.save([2])'))
      .then(object =>
        expect(object).toEqual({objectID: 'objects.save([2])', state: 'created'})
      )
      .then(() =>
        objects
          .save([
            {method: 'objects.save([4])'}, // objectID will be generated (create)
            {objectID: 'objects.save([3])', state: 'created'}, // objectID does not exists (create)
            {objectID: 'objects.save([2])', state: 'updated'} // objectID already exists (update)
          ])
      )
      .then(wait(index))
      .then(res => objects.get(res.objectIDs))
      .then(({results: objs}) =>
        expect(objs[0].method).toBe('objects.save([4])') &&
        expect(objs[1]).toEqual({objectID: 'objects.save([3])', state: 'created'}) &&
        expect(objs[2].state).toBe('updated')
      )
  );

  // objects.partialUpdate({})
  it('can partially update an object', () =>
    objects
      .save({objectID: 'objects.partialUpdate()', state: 'created', count: 0})
      .then(wait(index))
      .then(() => objects.get('objects.partialUpdate()'))
      .then(object =>
        expect(object).toEqual({objectID: 'objects.partialUpdate()', state: 'created', count: 0})
      )
      .then(() => objects.partialUpdate({objectID: 'objects.partialUpdate()', count: 1}))
      .then(wait(index))
      .then(() => objects.get('objects.partialUpdate()'))
      .then(({count}) => expect(count).toBe(1))
  );

  // objects.partialUpdate({}, {createIfNotExists: false})
  it('will not create an object when partial update and createIfNotExists: false', () =>
    objects
      .partialUpdate(
        {objectID: 'objects.partialUpdate({createIfNotExists: false})'},
        {createIfNotExists: false}
      )
      .then(wait(index))
      .then(() => objects.get('objects.partialUpdate({createIfNotExists: false})'))
      .then(({status}) => expect(status).toBe(404))
  );

  // objects.partialUpdate([{}])
  it('can partially update multiple objects', () =>
    objects
      .save([
        {objectID: 'objects.partialUpdate([0])', state: 'created', count: 0},
        {objectID: 'objects.partialUpdate([1])', state: 'created', count: 0}
      ])
      .then(wait(index))
      .then(() => objects.get(['objects.partialUpdate([0])', 'objects.partialUpdate([1])']))
      .then(({results: objs}) => expect(objs).toEqual([
        {objectID: 'objects.partialUpdate([0])', state: 'created', count: 0},
        {objectID: 'objects.partialUpdate([1])', state: 'created', count: 0}
      ]))
      .then(() =>
        objects
          .partialUpdate([
            {objectID: 'objects.partialUpdate([0])', count: 1},
            {objectID: 'objects.partialUpdate([1])', count: 2}
          ])
      )
      .then(wait(index))
      .then(() => objects.get(['objects.partialUpdate([0])', 'objects.partialUpdate([1])']))
      .then(({results: objs}) =>
        expect(objs[0].count).toBe(1) &&
        expect(objs[1].count).toBe(2)
      )
  );

  // objects.delete(objectID)
  it('can delete one object', () =>
    objects
      .save({objectID: 'objects.delete()'})
      .then(wait(index))
      .then(() => objects.get('objects.delete()'))
      .then(object => expect(object).toEqual({objectID: 'objects.delete()'}))
      .then(() => objects.delete('objects.delete()'))
      .then(wait(index))
      .then(() => objects.get('objects.delete()'))
      .then(({status}) => expect(status).toBe(404))
  );

  // objects.delete([objectIDs])
  it('can delete multiple objects', () =>
    objects
      .save([
        {objectID: 'objects.delete([0])'},
        {objectID: 'objects.delete([1])'}
      ])
      .then(wait(index))
      .then(() => objects.get(['objects.delete([0])', 'objects.delete([1])']))
      .then(({results: objs}) =>
        expect(objs).toEqual([
          {objectID: 'objects.delete([0])'},
          {objectID: 'objects.delete([1])'}
        ])
      )
      .then(() => objects.delete(['objects.delete([0])', 'objects.delete([1])']))
      .then(wait(index))
      .then(() => objects.get(['objects.delete([0])', 'objects.delete([1])']))
      .then(({results: objs}) => expect(objs).toEqual([null, null]))
  );


  // client.batch([{}])
  it('can do raw batching', () => {
    const batchIndexName = `${indexName}-batch`;
    const batchIndex = client.initIndex(batchIndexName);
    return batchIndex
      .delete()
      .then(wait(batchIndex))
      .then(() =>
        client
          .batch([
            {action: 'addObject', indexName, body: {objectID: 'client.batch([{0}])'}},
            {action: 'addObject', indexName: batchIndexName, body: {objectID: 'client.batch([{1}])'}}
          ])
      )
      .then(({taskID: taskIDs}) =>
        Promise.all([
          wait(index)({taskID: taskIDs[indexName]}),
          wait(batchIndex)({taskID: taskIDs[batchIndexName]}),
        ])
      )
      .then(() =>
        Promise.all([
          index.objects.get('client.batch([{0}])'),
          batchIndex.objects.get('client.batch([{1}])')
        ])
      )
      .then(objs =>
        expect(objs).toEqual([
          {objectID: 'client.batch([{0}])'},
          {objectID: 'client.batch([{1}])'}
        ])
      );
  });

  // client.getLogs()
  it('can get logs', () =>
    client
      .getLogs()
      .then(({logs}) =>
        expect(logs).toBeAn(Array) &&
        expect(logs.length).toBeGreaterThanOrEqualTo(0)
      )
  );

  // index.copy(destination)
  it('can copy an index', () => {
    const copyIndexName = `${indexName}-copy`;
    const copyIndex = client.initIndex(copyIndexName);
    return copyIndex
      .delete()
      .then(wait(copyIndex))
      .then(() => copyIndex.objects.get('index.copy()'))
      .then(({status}) => expect(status).toBe(404))
      .then(() => objects.save({objectID: 'index.copy()'}))
      .then(wait(index))
      .then(() => index.copy(copyIndexName))
      .then(wait(index))
      .then(() => copyIndex.objects.get('index.copy()'))
      .then(obj => expect(obj).toEqual({objectID: 'index.copy()'}));
  });

  // client.keys.*
  // index.keys.*

  // index.browse
  // index.browse(..., {cursor}) ? can the cursor be passed in searchParameters?
  // index.settings.save
  // index.settings.get
  // index.objects.get 404 => error?
});

serial('algoliasearch() integration suite (serial tests)', () => {
  // index.move()
  it('can move an index', () => {
    const moveIndexName = `${indexName}-move`;
    const moveIndex = client.initIndex(moveIndexName);
    return moveIndex
      .delete()
      .then(wait(moveIndex))
      .then(() => moveIndex.objects.get('index.move()'))
      .then(({status}) => expect(status).toBe(404))
      .then(() => objects.save({objectID: 'index.move()'}))
      .then(wait(index))
      .then(() => index.move(moveIndexName))
      .then(wait(index))
      .then(() => moveIndex.objects.get('index.move()'))
      .then(obj => expect(obj).toEqual({objectID: 'index.move()'}))
      .then(() => client.listIndexes())
      .then(indexesList =>
        expect(indexesList).toExist() &&
        expect(indexesList.items).toBeAn(Array) &&
        expect(some(indexesList.items, ['name', indexName])).toBe(false)
      );
  });

  it('can clear an index', () =>
    objects
      .save({objectID: 'index.clear()'})
      .then(wait(index))
      .then(() => objects.get('index.clear()'))
      .then(({objectID}) => expect(objectID).toBe('index.clear()'))
      .then(() => index.clear())
      .then(wait(index))
      .then(() => objects.get({objectID: 'index.clear()'}))
      .then(({status}) => expect(status).toBe(404))
  );
});

function wait(indexInstance) {
  return res => indexInstance.waitTask(res.taskID).then(() => res);
}
