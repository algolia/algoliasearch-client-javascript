// @flow

import type { RequestMethod, LogsParameters } from '../../types';

export default function getLogs(
  req: RequestMethod,
  options: LogsParameters = {}
) {
  const { offset = 0, length = 10 } = options;
  return req({
    method: 'GET',
    path: '/1/logs',
    qs: { offset, length },
  });
}
