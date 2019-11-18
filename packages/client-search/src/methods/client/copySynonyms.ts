import { WaitablePromise } from '@algolia/client-common';
import { RequestOptions } from '@algolia/transporter';

import { IndexOperationResponse, ScopeEnum, SearchClient } from '../..';
import { copyIndex, HasCopyIndex } from './copyIndex';

export const copySynonyms = <TClient extends SearchClient>(
  base: TClient
): TClient & HasCopyIndex & HasCopySynonyms => {
  return {
    ...copyIndex(base),
    copySynonyms(
      from: string,
      to: string,
      requestOptions?: RequestOptions
    ): Readonly<WaitablePromise<IndexOperationResponse>> {
      return this.copyIndex(from, to, {
        ...(requestOptions === undefined ? {} : requestOptions),
        scope: [ScopeEnum.Synonyms],
      });
    },
  };
};

export type HasCopySynonyms = {
  readonly copySynonyms: (
    from: string,
    to: string,
    requestOptions?: RequestOptions
  ) => Readonly<WaitablePromise<IndexOperationResponse>>;
};
