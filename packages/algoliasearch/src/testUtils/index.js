// @flow

import type { RequestMethod } from 'algoliasearch-requester';

export const snapshotAll = (requests: RequestMethod[]) =>
  requests.map(req => req.then(sn => expect(sn).toMatchSnapshot()));

export const fakeRequester: RequestMethod = requestParams =>
  new Promise(resolve => resolve(requestParams));
