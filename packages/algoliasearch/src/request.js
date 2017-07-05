/* eslint-disable import/no-extraneous-dependencies, import/no-unresolved */
// @flow

import { xhr } from '../../request'; // later: algoliasearch-request
import type { RequestOptions } from './types';

function req(options: RequestOptions) {
  xhr(options);
}

export default req;
