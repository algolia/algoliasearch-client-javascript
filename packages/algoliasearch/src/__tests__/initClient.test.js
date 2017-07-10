// @flow

import { initClient } from '../';
const validParams = { appId: 'some_app', apiKey: 'some_key' };

const snapshotAll = requests =>
  requests.map(req => req.then(sn => expect(sn).toMatchSnapshot()));

it('throws when it has too little parameters', () => {
  // $FlowIssue --> type disallows this
  expect(() => initClient({})).toThrow();
  // $FlowIssue --> type disallows this
  expect(() => initClient({ appId: '' })).toThrow();
  // $FlowIssue --> type disallows this
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

  snapshotAll(requests);
});

it('search', () => {
  const client = initClient(validParams);
  const requests = [
    client.search([
      {
        indexName: 'some_index',
        params: {},
      },
    ]),
  ];

  snapshotAll(requests);
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

  snapshotAll(requests);
});

it('listIndexes', () => {
  const client = initClient(validParams);

  const requests = [client.listIndexes(), client.listIndexes({ page: 1 })];

  snapshotAll(requests);
});
