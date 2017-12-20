// @flow
import type { RequestMethod } from 'algoliasearch-requester';

const fakeRequester: RequestMethod = requestParams =>
  Promise.resolve(requestParams);

export default fakeRequester;
