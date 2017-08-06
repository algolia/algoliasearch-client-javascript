// @flow

import type { RequestOptions } from '../algoliasearch/src/types';

type Translation = {
  [key: $Keys<RequestOptions>]: string,
};

const translationTable: Translation = {
  forwardedFor: 'X-Forwarded-For',
  userAgent: 'X-Algolia-Agent',
};

console.log(translationTable);
