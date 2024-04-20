import { WaitablePromise } from '@sefai/client-common';
import { RequestOptions } from '@sefai/transporter';

import { copyIndex, IndexOperationResponse, ScopeEnum, SearchClient } from '../..';

export const copySynonyms = (base: SearchClient) => {
  return (
    from: string,
    to: string,
    requestOptions?: RequestOptions
  ): Readonly<WaitablePromise<IndexOperationResponse>> => {
    return copyIndex(base)(from, to, {
      ...requestOptions,
      scope: [ScopeEnum.Synonyms],
    });
  };
};
