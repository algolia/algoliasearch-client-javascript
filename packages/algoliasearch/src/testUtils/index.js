// @flow

import type { RequestMethod } from '../types';

export const snapshotAll = requests =>
  requests.map(req => req.then(sn => expect(sn).toMatchSnapshot()));

export const fakeRequester: RequestMethod = requestParams =>
  new Promise(resolve => resolve(requestParams));
