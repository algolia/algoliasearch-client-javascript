// @flow

import type { RequestMethod } from 'algoliasearch-requester';

export const snapshotAll = (requests: RequestMethod[]) =>
  requests.map(req => req.then(sn => expect(sn).toMatchSnapshot()));
