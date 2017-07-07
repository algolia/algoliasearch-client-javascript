// @flow

import { initIndex } from '../';

const validParams = { appId: '', apiKey: '', indexName: '' };

it('throws when it has too little parameters', () => {
  expect(() => initIndex({})).toThrow();
  expect(() => initIndex({ appId: '' })).toThrow();
  expect(() => initIndex({ apiKey: '' })).toThrow();
  expect(() => initIndex(validParams)).not.toThrow();
});

it('contains the correct methods', () => {
  const index = initIndex(validParams);
  expect(Object.keys(index)).toMatchSnapshot();
});

it('batch', () => {
  const index = initIndex(validParams);
  const requests = [
    index.batch([
      {
        action: 'addObject',
        body: {
          some: 'data',
          nested: { is: { all: 'fine' } },
          function: is => `${is}also allowed, but not smart`,
        },
      },
    ]),
    index.batch([
      {
        action: 'updateObject',
        body: {
          objectID: 'some-cool-object',
          some: 'other data',
          and: 'this is everything now',
        },
      },
    ]),
    index.batch([
      {
        action: 'partialUpdateObject',
        body: {
          objectID: 'some-cool-object',
          some: 'data',
          the: 'rest is still here',
        },
      },
    ]),
    index.batch([
      {
        action: 'partialUpdateObjectNoCreate',
        body: {
          objectID: 'some-cool-object',
          this: 'object',
          "won't": 'be made',
          if: "it doesn't exist yet",
        },
      },
    ]),
    index.batch([
      {
        action: 'deleteObject',
        body: {
          objectID: 'some-uncool-object',
        },
      },
    ]),
    index.batch([
      {
        action: 'delete',
      },
    ]),
    index.batch([
      {
        action: 'clear',
      },
    ]),
  ];

  requests.map(req => expect(req).toMatchSnapshot());
});

// it('search', () => {
//   const index = initClient(validParams);
//   const request = index.search([
//     {
//       indexName: 'some_index',
//       params: {},
//     },
//   ]);
//   expect(request).toMatchSnapshot();
// });

// it('getLogs', () => {
//   const client = initClient(validParams);
//   const requests = [
//     client.getLogs(fakeRequest),
//     client.getLogs({}),
//     client.getLogs({ offset: 4 }),
//     client.getLogs({ length: 50 }),
//     client.getLogs({ offset: 4, length: 50 }),
//   ];

//   requests.map(req => expect(req).toMatchSnapshot());
// });

// it('listIndexes', () => {
//   const client = initClient(validParams);
//   const request = client.listIndexes(fakeRequest);
//   const requestWithPage = client.listIndexes({ page: 1 });

//   expect(request).toMatchSnapshot();
//   expect(requestWithPage).toMatchSnapshot();
// });
