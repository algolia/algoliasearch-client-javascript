import { Log } from '../..';
import { RequiredKeys } from '../../../../client-common/src/__tests__/helpers';
import { TestSuite } from '../../../../client-common/src/__tests__/TestSuite';

const testSuite = new TestSuite('get_logs');

test(testSuite.testName, async () => {
  const client = testSuite.makeSearchClient();

  const indices = await client.listIndices();
  expect(indices.nbPages).toBeGreaterThan(0);
  await client.listIndices();

  const getLogsResponse = await client.getLogs({
    length: 2,
    offset: 0,
    type: 'all',
  });

  expect(getLogsResponse.logs).toHaveLength(2);
  const keys: Array<RequiredKeys<Log>> = [
    'timestamp',
    'method',
    'answer_code',
    'query_body',
    'answer',
    'url',
    'ip',
    'sha1',
    'query_headers',
    'processing_time_ms',
  ];
  expect(Object.keys(getLogsResponse.logs[0])).toEqual(expect.arrayContaining(keys));
});
