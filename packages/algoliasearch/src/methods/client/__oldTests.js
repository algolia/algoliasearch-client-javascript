// @flow
import { snapshotAll, fakeRequester } from '../../testUtils';
it('batch', () => {
  const requests = [
    batch(fakeRequester, [
      {
        action: 'addObject',
        indexName: 'cool-index',
        body: {
          some: 'data',
          nested: { is: { all: 'fine' } },
          function: is => `${is}also allowed, but not smart`,
        },
      },
    ]),
    batch(fakeRequester, [
      {
        action: 'updateObject',
        indexName: 'uncool-index',
        body: {
          objectID: 'some-cool-object',
          some: 'other data',
          and: 'this is everything now',
        },
      },
    ]),
    batch(fakeRequester, [
      {
        action: 'partialUpdateObject',
        indexName: 'cool-index',
        body: {
          objectID: 'some-cool-object',
          some: 'data',
          the: 'rest is still here',
        },
      },
    ]),
    batch(fakeRequester, [
      {
        action: 'partialUpdateObjectNoCreate',
        indexName: 'cool-index',
        body: {
          objectID: 'some-cool-object',
          this: 'object',
          "won't": 'be made',
          if: "it doesn't exist yet",
        },
      },
    ]),
    batch(fakeRequester, [
      {
        action: 'deleteObject',
        indexName: 'cool-index',
        body: {
          objectID: 'some-uncool-object',
        },
      },
    ]),
    batch(fakeRequester, [
      {
        action: 'delete',
        indexName: 'uncool-index-with-bad-name',
      },
    ]),
    batch(fakeRequester, [
      {
        action: 'clear',
        indexName: 'cool-index-with-bad-contents',
      },
    ]),
  ];

  snapshotAll(requests);
});

it('getLogs', () => {
  const requests = [
    getLogs(fakeRequester),
    getLogs(fakeRequester, {}),
    getLogs(fakeRequester, { offset: 4 }),
    getLogs(fakeRequester, { length: 50 }),
    getLogs(fakeRequester, { offset: 4, length: 50 }),
  ];

  snapshotAll(requests);
});

it('listIndexes', () => {
  const requests = [
    listIndexes(fakeRequester),
    listIndexes(fakeRequester, { page: 1 }),
  ];

  snapshotAll(requests);
});
