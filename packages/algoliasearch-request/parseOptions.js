// @flow

import type { RequestOptions } from '../algoliasearch/src/types';

type Translation = {
  [key: $Keys<RequestOptions>]: string,
};

const translationTable: Translation = {
  forwardedFor: 'X-Forwarded-For',
  userAgent: 'X-Algolia-Agent',
  userId: 'X-Algolia-UserId',
};

const alwaysHeader: Array<string> = [];

export default function parseOptions(options: RequestOptions) {
  const keys: $Keys<RequestOptions> = Object.keys(options);

  return keys.reduce(
    (acc, key) => {
      if (key === 'extraHeaders') {
        return {
          ...acc,
          headers: {
            ...acc.headers,
            ...options.extraHeaders,
          },
        };
      }
      if (key === 'timeouts') {
        return {
          ...acc,
          timeouts: {
            ...acc.timeouts,
            ...options.timeouts,
          },
        };
      }
      if (alwaysHeader.contains(key)) {
        return {
          ...acc,
          headers: {
            ...acc.headers,
            [translationTable[key]]: options[key],
          },
        };
      }
      return {
        ...acc,
        queryStringOrBody: {
          ...acc.queryStringOrBody,
          [key]: options[key],
        },
      };
    },
    {
      queryStringOrBody: {},
      headers: {},
      timeouts: {},
    }
  );
}
