import { initIndex } from './';

const validParams = {
  appId: 'some_id',
  apiKey: 'some_key',
  indexName: 'some_index',
};

const snapshotAll = requests =>
  requests.map(req => req.then(sn => expect(sn).toMatchSnapshot()));

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

  snapshotAll(requests);
});

it('clear', () => {
  const index = initIndex(validParams);

  const requests = [index.clear()];
  snapshotAll(requests);
});

it('copy', () => {
  const index = initIndex(validParams);

  const requests = [index.copy('new_index')];
  snapshotAll(requests);
});

it('remove', () => {
  const index = initIndex(validParams);

  const requests = [index.remove()];
  snapshotAll(requests);
});

it('move', () => {
  const index = initIndex(validParams);

  const requests = [index.move('new_index')];
  snapshotAll(requests);
});

it('browse', () => {
  const index = initIndex(validParams);

  const requests = [index.browse(), index.browse({ hitsPerPage: 40 })];

  snapshotAll(requests);
});

it('browseFrom', () => {
  const index = initIndex(validParams);

  const requests = [index.browseFrom('some_weirdo_cursor')];
  snapshotAll(requests);
});

it('waitTask', () => {
  const index = initIndex(validParams);
  const requests = [index.waitTask('some_task_id')];

  snapshotAll(requests);
});
