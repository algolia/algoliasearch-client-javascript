import { WaitablePromise } from '@algolia/support';
import { RequestOptions } from '@algolia/transporter';

import { SearchClient } from '../../SearchClient';
import { IndexOperationResponse } from '../types/IndexOperationResponse';
import { ScopeEnum } from '../types/ScopeType';
import { copyIndex, HasCopyIndex } from './copyIndex';

export const copySettings = <TSearchClient extends SearchClient>(
  base: TSearchClient
): TSearchClient & HasCopyIndex & HasCopySettings => {
  return {
    ...copyIndex(base),
    copySettings(
      from: string,
      to: string,
      requestOptions?: RequestOptions
    ): Readonly<WaitablePromise<IndexOperationResponse>> {
      return this.copyIndex(from, to, {
        ...(requestOptions === undefined ? {} : requestOptions),
        scope: [ScopeEnum.Settings],
      });
    },
  };
};

export type HasCopySettings = SearchClient & {
  readonly copySettings: (
    from: string,
    to: string,
    requestOptions?: RequestOptions
  ) => Readonly<WaitablePromise<IndexOperationResponse>>;
};
