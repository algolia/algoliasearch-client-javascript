import { WaitablePromise } from '@algolia/support';
import { RequestOptions } from '@algolia/transporter';

import { SearchClient } from '../../SearchClient';
import { IndexOperationResponse } from '../types/IndexOperationResponse';
import { ScopeEnum } from '../types/ScopeType';
import { copyIndex, HasCopyIndex } from './copyIndex';

export const copySynonyms = <TSearchClient extends SearchClient>(
  base: TSearchClient
): TSearchClient & HasCopyIndex & HasCopySynonyms => {
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

export type HasCopySynonyms = SearchClient & {
  readonly copySynonyms: (
    from: string,
    to: string,
    requestOptions?: RequestOptions
  ) => Readonly<WaitablePromise<IndexOperationResponse>>;
};
