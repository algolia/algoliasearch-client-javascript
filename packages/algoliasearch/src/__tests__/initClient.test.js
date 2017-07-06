// @flow

import { initClient } from '../';

const validParams = { appId: '', apiKey: '' };

it('throws when it has too little parameters', () => {
  expect(() => initClient({})).toThrow();
  expect(() => initClient({ appId: '' })).toThrow();
  expect(() => initClient({ apiKey: '' })).toThrow();
});

it('contains the correct methods', () => {
  const client = initClient(validParams);
  expect(Object.keys(client)).toMatchSnapshot();
});

it('batch', () => {
  const fakeRequest = o => o;
  const client = initClient(validParams);
  const requests = [
    client.batch(fakeRequest, [
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
    client.batch(fakeRequest, [
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
    client.batch(fakeRequest, [
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
    client.batch(fakeRequest, [
      {
        action: 'partialUpdateObjectNoCreate',
        indexName: 'cool-index',
        body: {},
      },
    ]),
    client.batch(fakeRequest, [
      {
        action: 'deleteObject',
        indexName: 'cool-index',
        body: {},
      },
    ]),
    client.batch(fakeRequest, [
      {
        action: 'delete',
        indexName: 'cool-index',
      },
    ]),
    client.batch(fakeRequest, [
      {
        action: 'clear',
        indexName: 'cool-index',
      },
    ]),
  ];

  requests.map(req => expect(req).toMatchSnapshot());
});

it('search', () => {
  const fakeRequest = o => o;
  const client = initClient(validParams);
  const request = client.search(fakeRequest, [
    {
      indexName: 'some_index',
      params: {},
    },
  ]);
  expect(request).toMatchSnapshot();
});

it('getLogs', () => {
  const fakeRequest = o => o;
  const client = initClient(validParams);
  const requests = [
    client.getLogs(fakeRequest),
    client.getLogs(fakeRequest, {}),
    client.getLogs(fakeRequest, { offset: 4 }),
    client.getLogs(fakeRequest, { length: 50 }),
    client.getLogs(fakeRequest, { offset: 4, length: 50 }),
  ];

  requests.map(req => expect(req).toMatchSnapshot());
});

it('listIndexes', () => {
  const fakeRequest = o => o;
  const client = initClient(validParams);
  const request = client.listIndexes(fakeRequest);
  const requestWithPage = client.listIndexes(fakeRequest, 1);

  expect(request).toMatchSnapshot();
  expect(requestWithPage).toMatchSnapshot();
});
