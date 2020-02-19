import { BatchActionEnum, StrategyEnum } from '../..';
import { TestSuite } from '../../../../client-common/src/__tests__/TestSuite';
import { MultipleBatchRequest } from '../../types';

const testSuite = new TestSuite('multiple_operations');

test(testSuite.testName, async () => {
  const client = testSuite.makeSearchClient();

  const index = testSuite.makeIndex();
  const index2 = testSuite.makeIndex(`${index.indexName}_dev`);

  const queries: MultipleBatchRequest[] = [
    {
      indexName: index.indexName,
      action: BatchActionEnum.AddObject,
      body: { firstname: 'Jimmie' },
    },
    {
      indexName: index.indexName,
      action: BatchActionEnum.AddObject,
      body: { firstname: 'Jimmie' },
    },
    {
      indexName: index2.indexName,
      action: BatchActionEnum.AddObject,
      body: { firstname: 'Jimmie' },
    },
    {
      indexName: index2.indexName,
      action: BatchActionEnum.AddObject,
      body: { firstname: 'Jimmie' },
    },
  ];

  await index.setSettings({ attributesForFaceting: ['searchable(firstname)'] }).wait();

  const responses = await client.multipleBatch(queries).wait();
  const objectIDs = responses.objectIDs.map(objectID => objectID);

  const result = await client.multipleGetObjects([
    { indexName: index.indexName, objectID: objectIDs[0] },
    { indexName: index.indexName, objectID: objectIDs[1] },
    { indexName: index2.indexName, objectID: objectIDs[2] },
    { indexName: index2.indexName, objectID: objectIDs[3] },
  ]);

  expect(result.results).toEqual(
    objectIDs.map(objectID => {
      return {
        firstname: 'Jimmie',
        objectID,
      };
    })
  );

  const multipleQueriesResponse1 = await client.multipleQueries(
    [
      { indexName: index.indexName, query: '', params: { hitsPerPage: 2 } },
      { indexName: index2.indexName, params: { hitsPerPage: 2 } },
    ],
    { strategy: StrategyEnum.None }
  );

  expect(multipleQueriesResponse1.results[0].hits).toHaveLength(2);
  expect(multipleQueriesResponse1.results[1].hits).toHaveLength(2);

  const multipleQueriesResponse2 = await client.search(
    [
      { indexName: index.indexName, query: '', params: { hitsPerPage: 2 } },
      { indexName: index2.indexName, params: { hitsPerPage: 2 } },
    ],
    { strategy: StrategyEnum.StopIfEnoughMatches }
  );

  expect(multipleQueriesResponse2.results[0].hits).toHaveLength(2);
  expect(multipleQueriesResponse2.results[1].hits).toHaveLength(0);

  const searchForFacetValuesResponse = await client.searchForFacetValues([
    {
      indexName: index.indexName,
      params: {
        facetName: 'firstname',
        facetQuery: 'Jimmie',
      },
    },
  ]);

  expect(searchForFacetValuesResponse[0].facetHits).toEqual([
    {
      count: 2,
      highlighted: '<em>Jimmie</em>',
      value: 'Jimmie',
    },
  ]);
});
