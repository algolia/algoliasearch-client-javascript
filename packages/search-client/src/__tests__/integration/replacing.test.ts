import { createMultiWaitable } from '@algolia/support/src/__tests__/helpers';
import { TestSuite } from '@algolia/support/src/__tests__/TestSuite';
import { ApiError } from '@algolia/transporter-types';

const testSuite = new TestSuite('replacing');

afterAll(() => testSuite.cleanUp());

test(testSuite.testName, async () => {
  const index = testSuite.makeIndex();
  let responses: any = [];

  responses.push(index.saveObject({ objectID: 'one' }));
  responses.push(index.saveSynonym({ objectID: 'one', type: 'synonym', synonyms: ['one', 'two'] }));
  // @todo save rule here...

  await createMultiWaitable(responses).wait();
  responses = [];

  responses.push(index.replaceAllObjects([{ objectID: 'two' }], { safe: true }));
  // @todo replace all rules here...

  responses.push(
    index.replaceAllSynonyms([{ objectID: 'two', type: 'synonym', synonyms: ['one', 'two'] }])
  );

  await createMultiWaitable(responses).wait();

  await expect(index.getObject('one')).rejects.toEqual(
    new ApiError('ObjectID does not exist', 404)
  );
  await expect(index.getObject('two')).resolves.toEqual({ objectID: 'two' });

  await expect(index.getSynonym('one')).rejects.toEqual(
    new ApiError('Synonym does not exist', 404)
  );
  await expect(index.getSynonym('two')).resolves.toEqual({
    objectID: 'two',
    type: 'synonym',
    synonyms: ['one', 'two'],
  });
});
