import { encode } from '@algolia/client-common';
import { MethodEnum } from '@algolia/requester-common';
import { RequestOptions, Transporter } from '@algolia/transporter';
import { anything, deepEqual, spy, verify, when } from 'ts-mockito';

import { BatchActionEnum, SaveObjectsOptions } from '../..';
import algoliasearch, { SearchIndex } from '../../../../algoliasearch/src/builds/browser';
import { createFaker } from '../../../../client-common/src/__tests__/createFaker';

let index: SearchIndex;
let transporterMock: Transporter;

const res: any = {
  objectIDs: ['1'],
  taskID: 1,
};

beforeEach(() => {
  index = algoliasearch('appId', 'apiKey').initIndex('foo');

  transporterMock = spy(index.transporter);

  when(transporterMock.read(anything(), anything())).thenResolve({
    status: 'published',
    hits: [
      {
        objectID: 1,
        name: 'foo',
      },
    ],
  });
});

describe('save objects', () => {
  it('Proxies down to save objects', async () => {
    const indexSpy = spy(index);

    const obj = createFaker().object();
    const requestoptions = {
      timeout: 1,
    };

    const resSaveObject: any = [
      {
        objectIDs: ['1'],
        taskID: 2,
      },
    ];

    when(indexSpy.saveObjects(deepEqual([obj]), requestoptions)).thenResolve(resSaveObject);

    const response = await index.saveObject(obj, requestoptions);

    expect(response.objectID).toBe('1');
    expect(response.taskID).toBe(2);
  });

  it('Uses addObject when `autoGenerateObjectIDIfNotExist` is true', async () => {
    const indexSpy = spy(index);
    const objects = [createFaker().object()];
    const requestOptions: RequestOptions & SaveObjectsOptions = {
      autoGenerateObjectIDIfNotExist: true,
    };

    when(indexSpy.chunk(anything(), anything(), anything())).thenResolve(res);

    await index.saveObjects(objects, requestOptions);

    verify(indexSpy.chunk(objects, BatchActionEnum.AddObject, requestOptions)).once();
  });

  it('Uses updateObject when `autoGenerateObjectIDIfNotExist` is not set', async () => {
    const indexSpy = spy(index);
    const objects = [createFaker().object('myObjectID')];

    when(indexSpy.chunk(anything(), anything(), anything())).thenResolve(res);

    await index.saveObjects(objects);

    verify(indexSpy.chunk(objects, BatchActionEnum.UpdateObject, undefined)).once();
  });

  it('Validates the object id when `autoGenerateObjectIDIfNotExist` is !== true', async () => {
    const indexSpy = spy(index);
    const objects = [{ noObjectId: true }];

    expect.assertions(1);

    try {
      await index.saveObjects(objects);
    } catch (e) {
      expect(e.message).toBe(
        '. All objects must have an unique objectID ' +
          '(like a primary key) to be valid. ' +
          'Algolia is also able to generate objectIDs ' +
          "automatically but *it's not recommended*. " +
          'To do it, use `saveObjects(objects, ' +
          "{'autoGenerateObjectIDIfNotExist': true})`."
      );
    }

    verify(indexSpy.chunk(anything(), anything(), anything())).never();
  });
});

describe('chunk', () => {
  it("Don't call batch when no objects", async () => {
    const indexSpy = spy(index);

    await index.chunk([], BatchActionEnum.AddObject);
    await index.chunk([], BatchActionEnum.UpdateObject);

    verify(indexSpy.batch(anything())).never();
  });

  it('Call batch when there is objects with default batch size', async () => {
    const indexSpy = spy(index);

    when(indexSpy.batch(anything(), anything())).thenResolve(res);

    await index.chunk([createFaker().object()], BatchActionEnum.AddObject);
    await index.chunk(createFaker().objects(1001), BatchActionEnum.UpdateObject);

    verify(indexSpy.batch(anything(), anything())).times(3);
  });

  it('Call batch when there is objects with a given batch size', async () => {
    const indexSpy = spy(index);

    when(indexSpy.batch(anything(), anything())).thenResolve(res);

    await index.chunk([createFaker().object()], BatchActionEnum.AddObject);
    await index.chunk(createFaker().objects(1001), BatchActionEnum.UpdateObject, {
      batchSize: 100,
    });

    verify(indexSpy.batch(anything(), anything())).times(12);
  });

  it('Does not perform one extra call when size of objects is the same as batch size', async () => {
    const indexSpy = spy(index);

    when(indexSpy.batch(anything(), anything())).thenResolve(res);

    await index.chunk(createFaker().objects(1000), BatchActionEnum.UpdateObject);

    verify(indexSpy.batch(anything(), anything())).once();
  });
});

describe('get object', () => {
  it('Passes request options to transporter', async () => {
    const requestOptions = {
      timeout: 2,
    };

    await index.getObject('bar', requestOptions);

    verify(transporterMock.read(anything(), requestOptions)).once();
  });
});

describe('get settings', () => {
  it('Passes getVersion=2 queryParameters', async () => {
    const requestOptions = {
      data: {},
      timeout: undefined,
      headers: {},
      queryParameters: { getVersion: '2' },
      cacheable: undefined,
    };

    await index.getSettings();
    await index.getSettings({});

    verify(transporterMock.read(anything(), deepEqual(requestOptions))).twice();
  });

  it('Passes getVersion=2 queryParameters and custom request options', async () => {
    const requestOptions = {
      data: {},
      timeout: undefined,
      headers: {},
      queryParameters: { foo: 'bar', getVersion: '2' },
      cacheable: undefined,
    };

    await index.getSettings({
      queryParameters: {
        foo: 'bar',
      },
    });

    verify(transporterMock.read(anything(), deepEqual(requestOptions))).once();
  });
});

describe('get objects', () => {
  it('Passes request options to transporter', async () => {
    const requestOptions = {
      timeout: 2,
    };

    await index.getObjects(['bar'], requestOptions);

    verify(transporterMock.read(anything(), requestOptions)).once();
  });

  it('Allows to pass `attributesToRetrieve`', async () => {
    const requestOptions = {
      attributesToRetrieve: ['name'],
      timeout: 2,
    };

    await index.getObjects(['bar'], requestOptions);

    verify(
      transporterMock.read(
        deepEqual({
          method: MethodEnum.Post,
          path: `1/indexes/*/objects`,
          data: {
            requests: [
              {
                indexName: 'foo',
                objectID: 'bar',
                attributesToRetrieve: ['name'],
              },
            ],
          },
        }),
        requestOptions
      )
    ).once();
  });
});

describe('find object', () => {
  it('passes request options to search', async () => {
    const requestOptions = {
      timeout: 10,
      page: 0,
    };

    await index.findObject(() => true, requestOptions);

    verify(transporterMock.read(anything(), deepEqual(requestOptions))).once();
  });
});

describe('exists', () => {
  it('passes request options to getSettings', async () => {
    const requestOptions = {
      data: {},
      timeout: 10,
      headers: {},
      queryParameters: { getVersion: '2' },
      cacheable: undefined,
    };

    await index.exists(requestOptions);

    verify(transporterMock.read(anything(), deepEqual(requestOptions))).once();
  });
});

describe('wait task', () => {
  it('passes request options to get task', async () => {
    const requestOptions = {
      data: {},
      timeout: 10,
      headers: {},
      queryParameters: {},
      cacheable: undefined,
    };

    await index.waitTask(1, requestOptions);

    verify(
      transporterMock.read(
        deepEqual({
          method: MethodEnum.Get,
          path: encode('1/indexes/%s/task/%s', 'foo', '1'),
        }),
        deepEqual(requestOptions)
      )
    ).once();
  });
});
