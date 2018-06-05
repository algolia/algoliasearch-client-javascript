// @flow

import type { RequestMethod } from 'algoliasearch-requester';

export const snapshotAll = (requests: RequestMethod[]): void[] =>
  requests.map(req => expect(req).resolves.toMatchSnapshot());
