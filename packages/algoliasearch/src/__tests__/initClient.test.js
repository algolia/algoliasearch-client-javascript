// @flow

import { initClient } from '../';
const validParams = { appId: '', apiKey: '' };

it('throws when it has too little parameters', () => {
  expect(() => initClient({})).toThrow();
  expect(() => initClient({ appId: '' })).toThrow();
  expect(() => initClient({ apiKey: '' })).toThrow();
  expect(() => initClient(validParams)).not.toThrow();
});

it('contains the correct methods', () => {
  const client = initClient(validParams);
  expect(Object.keys(client)).toMatchSnapshot();
});

it('batch', () => {
  const client = initClient(validParams);
  const requests = [
    client.batch([
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
    client.batch([
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
    client.batch([
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
    client.batch([
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
    client.batch([
      {
        action: 'deleteObject',
        indexName: 'cool-index',
        body: {
          objectID: 'some-uncool-object',
        },
      },
    ]),
    client.batch([
      {
        action: 'delete',
        indexName: 'uncool-index-with-bad-name',
      },
    ]),
    client.batch([
      {
        action: 'clear',
        indexName: 'cool-index-with-bad-contents',
      },
    ]),
  ];

  requests.map(req => expect(req).toMatchSnapshot());
});

it('search', () => {
  const client = initClient(validParams);
  const request = client.search([
    {
      indexName: 'some_index',
      params: {},
    },
  ]);
  expect(request).toMatchSnapshot();
});

it('getLogs', () => {
  const client = initClient(validParams);
  const requests = [
    client.getLogs(),
    client.getLogs({}),
    client.getLogs({ offset: 4 }),
    client.getLogs({ length: 50 }),
    client.getLogs({ offset: 4, length: 50 }),
  ];

  requests.map(req => expect(req).toMatchSnapshot());
});

it('listIndexes', () => {
  const client = initClient(validParams);
  const request = client.listIndexes();
  const requestWithPage = client.listIndexes({ page: 1 });

  expect(request).toMatchSnapshot();
  expect(requestWithPage).toMatchSnapshot();
});
