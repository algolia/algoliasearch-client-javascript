import { SearchClient } from '../../..';
import { Transporter } from '@algolia/transporter';
import { deepEqual, mock, when, instance, anything, spy, verify } from 'ts-mockito';
import { saveObject, HasSaveObject } from '../../methods/index/saveObject';
import { batch, HasBatch } from '../../methods/index/batch';

import { saveObjects, HasSaveObjects } from '../../methods/index/saveObjects';
import { Faker } from '@algolia/support/src/__tests__/Faker';
import { RequestOptions, UserAgent } from '@algolia/transporter-types';

import { HasGetObject, getObject } from '../../methods/index/getObject';
import { HasGetObjects, getObjects } from '../../methods/index/getObjects';
import { Method } from '@algolia/requester-types';
import { BatchAction } from '../../methods/types/BatchAction';
import {
  HasSearchForFacetValues,
  searchForFacetValues,
} from '../../methods/index/searchForFacetValues';
import { SaveObjectsOptions } from '../../methods/types/SaveObjectsOptions';
import { getSettings, HasGetSettings } from '../../methods/index/getSettings';
import { SearchIndex } from '../../SearchIndex';

const transporterMock = mock(Transporter);
const transporter = instance(transporterMock);

type SearchIndexType = HasBatch &
  HasSaveObject &
  HasSaveObjects &
  HasGetObject &
  HasGetObjects &
  HasGetSettings &
  HasSearchForFacetValues;

const index = new SearchClient({
  transporter,
  appId: 'appId',
  apiKey: 'apiKey',
  userAgent: UserAgent.create('4.0.0'),
}).initIndex<SearchIndexType>('foo', {
  methods: [
    batch,
    saveObject,
    saveObjects,
    getObject,
    getObjects,
    getSettings,
    searchForFacetValues,
  ],
});

const res: any = {
  objectIDs: ['1'],
  taskID: 1,
};

describe('initIndex', () => {
  it('can be instanciated without options', () => {
    expect(
      new SearchClient({
        transporter,
        appId: 'appId',
        apiKey: 'apiKey',
        userAgent: UserAgent.create('4.0.0'),
      }).initIndex<SearchIndex>('foo')
    ).toBeInstanceOf(SearchIndex);
  });
});

describe('SaveObject', () => {
  it('Proxies down to save objects', async () => {
    const indexSpy = spy(index);

    const obj = Faker.object();
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
});

describe('SaveObjects', () => {
  it('Uses addObject when `autoGenerateObjectIDIfNotExist` is true', async () => {
    const indexSpy = spy(index);
    const objects = [Faker.object()];
    const requestOptions: RequestOptions & SaveObjectsOptions = {
      autoGenerateObjectIDIfNotExist: true,
    };

    when(indexSpy.chunk(anything(), anything(), anything())).thenResolve(res);

    await index.saveObjects(objects, requestOptions);

    verify(indexSpy.chunk(objects, BatchAction.AddObject, requestOptions)).once();
  });

  it('Uses updateObject when `autoGenerateObjectIDIfNotExist` is not set', async () => {
    const indexSpy = spy(index);
    const objects = [Faker.object('myObjectID')];

    when(indexSpy.chunk(anything(), anything(), anything())).thenResolve(res);

    await index.saveObjects(objects);

    verify(indexSpy.chunk(objects, BatchAction.UpdateObject, undefined)).once();
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

describe('Chunk', () => {
  it("Don't call batch when no objects", async () => {
    const indexSpy = spy(index);

    await index.chunk([], BatchAction.AddObject);
    await index.chunk([], BatchAction.UpdateObject);

    verify(indexSpy.batch(anything())).never();
  });

  it('Call batch when there is objects with default batch size', async () => {
    const indexSpy = spy(index);

    when(indexSpy.batch(anything(), anything())).thenResolve(res);

    await index.chunk([Faker.object()], BatchAction.AddObject);
    await index.chunk(Faker.objects(1001), BatchAction.UpdateObject);

    verify(indexSpy.batch(anything(), anything())).times(3);
  });

  it('Call batch when there is objects with a given batch size', async () => {
    const indexSpy = spy(index);

    when(indexSpy.batch(anything(), anything())).thenResolve(res);

    await index.chunk([Faker.object()], BatchAction.AddObject);
    await index.chunk(Faker.objects(1001), BatchAction.UpdateObject, {
      batchSize: 100,
    });

    verify(indexSpy.batch(anything(), anything())).times(12);
  });

  it('Does not perform one extra call when size of objects is the same as batch size', async () => {
    const indexSpy = spy(index);

    when(indexSpy.batch(anything(), anything())).thenResolve(res);

    await index.chunk(Faker.objects(1000), BatchAction.UpdateObject);

    verify(indexSpy.batch(anything(), anything())).once();
  });
});

describe('Get Object', () => {
  it('Passes request options to transporter', async () => {
    const requestOptions = {
      timeout: 2,
    };

    await index.getObject('bar', requestOptions);

    verify(transporterMock.read(anything(), requestOptions)).once();
  });
});

describe('Get Settings', () => {
  it('Passes getVersion=2 queryParameters', async () => {
    const requestOptions = {
      data: {},
      timeout: undefined,
      headers: {},
      queryParameters: { getVersion: '2' },
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
    };

    await index.getSettings({
      queryParameters: {
        foo: 'bar',
      },
    });

    verify(transporterMock.read(anything(), deepEqual(requestOptions))).once();
  });
});

describe('Get Objects', () => {
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
          method: Method.Post,
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
