import { SearchClient } from '../..';
import { Transporter } from '@algolia/transporter';
import { deepEqual, mock, when, instance, anything, spy, verify } from 'ts-mockito';
import { saveObject, HasSaveObject } from '../../Methods/SearchIndex/saveObject';
import { batch, HasBatch, Action } from '../../Methods/SearchIndex/batch';

import {
  saveObjects,
  HasSaveObjects,
  SaveObjectsOptions,
} from '../../Methods/SearchIndex/saveObjects';
import { Faker } from '../Faker';
import { RequestOptions, UserAgent } from '@algolia/transporter-types';

import { HasGetObject, getObject } from '../../Methods/SearchIndex/getObject';
import { HasGetObjects, getObjects } from '../../Methods/SearchIndex/getObjects';
import { Method } from '@algolia/requester-types';

const transporterMock = mock(Transporter);
const transporter = instance(transporterMock);

when(transporterMock.withHeaders(anything())).thenReturn(transporter);
when(transporterMock.withHosts(anything())).thenReturn(transporter);

const index = new SearchClient({
  transporter,
  appId: 'appId',
  apiKey: 'apiKey',
  userAgent: UserAgent.create('4.0.0'),
}).initIndex<HasBatch & HasSaveObject & HasSaveObjects & HasGetObject & HasGetObjects>('foo', {
  methods: [batch, saveObject, saveObjects, getObject, getObjects],
});

const res: any = {
  objectIDs: ['1'],
  taskID: 1,
};

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

    verify(indexSpy.chunk(objects, Action.AddObject, requestOptions)).once();
  });

  it('Uses updateObject when `autoGenerateObjectIDIfNotExist` is not set', async () => {
    const indexSpy = spy(index);
    const objects = [Faker.object('myObjectID')];

    when(indexSpy.chunk(anything(), anything(), anything())).thenResolve(res);

    await index.saveObjects(objects);

    verify(indexSpy.chunk(objects, Action.UpdateObject, undefined)).once();
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

    await index.chunk([], Action.AddObject);
    await index.chunk([], Action.UpdateObject);

    verify(indexSpy.batch(anything())).never();
  });

  it('Call batch when there is objects with default batch size', async () => {
    const indexSpy = spy(index);

    when(indexSpy.batch(anything(), anything())).thenResolve(res);

    await index.chunk([Faker.object()], Action.AddObject);
    await index.chunk(Faker.objects(1001), Action.UpdateObject);

    verify(indexSpy.batch(anything(), anything())).times(3);
  });

  it('Call batch when there is objects with a given batch size', async () => {
    const indexSpy = spy(index);

    when(indexSpy.batch(anything(), anything())).thenResolve(res);

    await index.chunk([Faker.object()], Action.AddObject);
    await index.chunk(Faker.objects(1001), Action.UpdateObject, {
      batchSize: 100,
    });

    verify(indexSpy.batch(anything(), anything())).times(12);
  });

  it('Does not perform one extra call when size of objects is the same as batch size', async () => {
    const indexSpy = spy(index);

    when(indexSpy.batch(anything(), anything())).thenResolve(res);

    await index.chunk(Faker.objects(1000), Action.UpdateObject);

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
