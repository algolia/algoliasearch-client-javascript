// @flow

import type { RequestMethod } from '../../types';

export type Parameters = {
  offset?: number,
  length?: number,
};

export default function getLogs(req: RequestMethod, options: Parameters = {}) {
  const { offset = 0, length = 10 } = options;
  return req({
    method: 'GET',
    path: '/1/logs',
    qs: { offset, length },
  });
}
