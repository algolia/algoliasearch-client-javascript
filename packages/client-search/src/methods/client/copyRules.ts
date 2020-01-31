import { WaitablePromise } from '@algolia/client-common';
import { RequestOptions } from '@algolia/transporter';

import { copyIndex, IndexOperationResponse, ScopeEnum, SearchClient } from '../..';

export const copyRules = (base: SearchClient) => {
  return (
    from: string,
    to: string,
    requestOptions?: RequestOptions
  ): Readonly<WaitablePromise<IndexOperationResponse>> => {
    return copyIndex(base)(from, to, {
      ...requestOptions,
      scope: [ScopeEnum.Rules],
    });
  };
};
