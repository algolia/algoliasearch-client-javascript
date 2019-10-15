import { ConstructorOf, WaitablePromise } from '@algolia/support';
import { RequestOptions } from '@algolia/transporter-types';

import { SearchClient } from '../../SearchClient';
import { IndexOperationResponse } from '../types/IndexOperationResponse';
import { ScopeEnum } from '../types/ScopeType';
import { copyIndex, HasCopyIndex } from './copyIndex';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const copySynonyms = <TSearchClient extends ConstructorOf<SearchClient>>(
  base: TSearchClient
) => {
  const mixin: ConstructorOf<SearchClient & HasCopyIndex> = copyIndex(base);

  return class extends mixin implements HasCopySynonyms {
    public copySynonyms(
      from: string,
      to: string,
      requestOptions?: RequestOptions
    ): Readonly<WaitablePromise<IndexOperationResponse>> {
      return this.copyIndex(from, to, {
        ...(requestOptions === undefined ? {} : requestOptions),
        scope: [ScopeEnum.Synonyms],
      });
    }
  };
};

export type HasCopySynonyms = SearchClient & {
  readonly copySynonyms: (
    from: string,
    to: string,
    requestOptions?: RequestOptions
  ) => Readonly<WaitablePromise<IndexOperationResponse>>;
};
