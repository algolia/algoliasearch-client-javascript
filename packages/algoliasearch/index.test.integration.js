/* eslint-env mocha */
import {some} from 'lodash';
import expect from 'expect';
import parallel from 'mocha.parallel';
import algoliasearch from './index.js';

const serial = describe;
const {appId, apiKey, indexName} = process.env;
const client = algoliasearch({appId, apiKey});
const index = client.initIndex(indexName);
const objects = index.objects;

serial('algoliasearch() integration suite (serial actions)', () => {
  // index.delete()
  it('can delete the index', () =>
    index
      .delete()
      .then(wait(index))
      .then(() =>
        client
          .listIndexes()
          .then(list =>
            expect(list).toExist() &&
            expect(list.items).toBeAn(Array) &&
            expect(some(list.items, ['name', indexName])).toBe(false)
          )
      )
  );
});

parallel('algoliasearch() integration suite (parallel actions)', () => {
  // client.listIndexes()
  it('can list indexes', () =>
    client
      .listIndexes()
      .then(list => expect(list).toExist())
  );

  // objects.save({}) without objectID + objects.get(objectID) + check index presence in list
  it('can save a single object without an objectID', () =>
    objects
      .save({method: 'objects.save({})'})
      .then(res =>
        wait(index)(res)
          .then(() =>
            objects
              .get(res.objectID)
              .then(obj => expect(obj).toEqual({
                method: 'objects.save({})',
                objectID: res.objectID
              }))
          )
      )
      .then(() =>
        // double check index was created since we saved an object (this is the default Algolia behavior)
        client
          .listIndexes()
          .then(list => expect(some(list.items, ['name', indexName])).toBe(true))
      )
  );

  // objects.get(objectID, {attributesToRetrieve})
  it('can selectively get some attributes', () =>
    objects
      .save({objectID: 'objects.get(objectID, {attributesToRetrieve})', value: 'well', more: 'yes'})
      .then(res =>
        wait(index)(res)
          .then(() =>
            objects
              .get('objects.get(objectID, {attributesToRetrieve})', {attributesToRetrieve: ['more']})
              .then(obj => expect(obj).toEqual({
                objectID: 'objects.get(objectID, {attributesToRetrieve})',
                more: 'yes'
              }))
          )
      )
  );

  // objects.save([{}]) without objectID + objects.get([objectIDs])
  it('can save multiple objects without objectIDs', () =>
    objects
      .save([
        {method: 'objects.save([0])'},
        {method: 'objects.save([1])'}
      ])
      .then(res =>
        wait(index)(res)
          .then(() =>
            objects
              .get(res.objectIDs)
              .then(({results}) => expect(results).toEqual([
                {objectID: res.objectIDs[0], method: 'objects.save([0])'},
                {objectID: res.objectIDs[1], method: 'objects.save([1])'}
              ]))
          )
      )
  );

  // objects.save({}) with objectID
  it('can save a single object with an objectID', () =>
    objects
      .save({objectID: 'objects.save({})', state: 'created'})
      .then(wait(index))
      .then(() =>
        objects
          .get('objects.save({})')
          .then(res => expect(res).toEqual({objectID: 'objects.save({})', state: 'created'}))
      )
  );

  // objects.save({}) with same objectID should update
  it('can update a single object with an objectID', () =>
    objects
      .save({objectID: 'objects.save({update})', state: 'created'})
      .then(wait(index))
      .then(() =>
        objects
          .get('objects.save({update})')
          .then(object =>
            expect(object).toEqual({objectID: 'objects.save({update})', state: 'created'})
          )
          .then(() =>
            objects
              .save({objectID: 'objects.save({update})', state: 'updated'})
              .then(wait(index))
              .then(() =>
                objects
                  .get('objects.save({update})')
                  .then(object =>
                    expect(object).toEqual({objectID: 'objects.save({update})', state: 'updated'})
                  )
              )
          )
      )
  );

  // objects.save([{}]) with and without objectID should create or update
  it('can update multiple objects given they exist or not, with or without objectID', () =>
    // prepare one existing object
    objects
      .save({objectID: 'objects.save([2])', state: 'created'})
      .then(wait(index))
      .then(() =>
        objects
          .get('objects.save([2])')
          .then(res => expect(res).toEqual({objectID: 'objects.save([2])', state: 'created'}))
          .then(() =>
            objects
              .save([
                {method: 'objects.save([4])'}, // objectID will be generated (create)
                {objectID: 'objects.save([3])', state: 'created'}, // objectID does not exists (create)
                {objectID: 'objects.save([2])', state: 'updated'} // objectID already exists (update)
              ])
              .then(res =>
                wait(index)(res)
                  .then(() =>
                    objects
                      .get(res.objectIDs)
                      .then(({results}) => expect(results).toEqual([
                        {objectID: res.objectIDs[0], method: 'objects.save([4])'},
                        {objectID: 'objects.save([3])', state: 'created'},
                        {objectID: 'objects.save([2])', state: 'updated'}
                      ]))
                  )
              )
          )
      )
  );

  // objects.partialUpdate({})
  it('can partially update an object', () =>
    objects
      .save({objectID: 'objects.partialUpdate()', state: 'created', count: 0})
      .then(wait(index))
      .then(() =>
        objects
          .get('objects.partialUpdate()')
          .then(res => expect(res).toEqual({objectID: 'objects.partialUpdate()', state: 'created', count: 0}))
          .then(() =>
            objects
              .partialUpdate({objectID: 'objects.partialUpdate()', count: 1})
              .then(wait(index))
              .then(() =>
                objects
                  .get('objects.partialUpdate()')
                  .then(res => expect(res.count).toBe(1))
                )
          )
      )
  );

  // objects.partialUpdate({}, {createIfNotExists: false})
  it('will not create an object when partial update and createIfNotExists: false', () =>
    objects
      .partialUpdate(
        {objectID: 'objects.partialUpdate({createIfNotExists: false})'},
        {createIfNotExists: false}
      )
      .then(wait(index))
      .then(() =>
        objects
          .get('objects.partialUpdate({createIfNotExists: false})')
          .then(res => expect(res.status).toBe(404))
      )
  );

  // objects.partialUpdate([{}])
  it('can partially update multiple objects', () =>
    objects
      .save([
        {objectID: 'objects.partialUpdate([0])', state: 'created', count: 0},
        {objectID: 'objects.partialUpdate([1])', state: 'created', count: 0}
      ])
      .then(wait(index))
      .then(() =>
        objects
          .get(['objects.partialUpdate([0])', 'objects.partialUpdate([1])'])
          .then(res => expect(res.results).toEqual([
            {objectID: 'objects.partialUpdate([0])', state: 'created', count: 0},
            {objectID: 'objects.partialUpdate([1])', state: 'created', count: 0}
          ]))
          .then(() =>
            objects
              .partialUpdate([
                {objectID: 'objects.partialUpdate([0])', count: 1},
                {objectID: 'objects.partialUpdate([1])', count: 2}
              ])
              .then(wait(index))
              .then(() =>
                objects
                  .get(['objects.partialUpdate([0])', 'objects.partialUpdate([1])'])
                  .then(res =>
                    expect(res.results[0].count).toBe(1) &&
                    expect(res.results[1].count).toBe(2)
                  )
              )
          )
      )
  );

  // objects.delete(objectID)
  it('can delete one object', () =>
    objects
      .save({objectID: 'objects.delete()'})
      .then(wait(index))
      .then(() =>
        objects
          .get('objects.delete()')
          .then(res => expect(res).toEqual({objectID: 'objects.delete()'}))
          .then(() =>
            objects
              .delete('objects.delete()')
              .then(wait(index))
              .then(() =>
                objects
                  .get('objects.delete()')
                  .then(res => expect(res.status).toBe(404))
              )
          )
      )
  );

  // objects.delete([objectIDs])
  it('can delete multiple objects', () =>
    objects
      .save([
        {objectID: 'objects.delete([0])'},
        {objectID: 'objects.delete([1])'}
      ])
      .then(wait(index))
      .then(() =>
        objects
          .get(['objects.delete([0])', 'objects.delete([1])'])
          .then(res => expect(res.results).toEqual([
            {objectID: 'objects.delete([0])'},
            {objectID: 'objects.delete([1])'}
          ]))
          .then(() =>
            objects
              .delete(['objects.delete([0])', 'objects.delete([1])'])
              .then(wait(index))
              .then(() =>
                objects
                  .get(['objects.delete([0])', 'objects.delete([1])'])
                  .then(res => expect(res.results).toEqual([null, null]))
              )
          )
      )
  );

  // client.batch

  // client.keys
  // index.keys

  // index.browse
  // index.browse(..., {cursor}) ? can the cursor be passed in searchParameters?
  // index.move
  // index.copy
  // index.clear
});

function wait(indexInstance) {
  return res => indexInstance.waitTask(res.taskID);
}
