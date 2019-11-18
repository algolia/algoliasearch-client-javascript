import { WaitablePromise } from '@algolia/client-common';
import { RequestOptions } from '@algolia/transporter';

import { IndexOperationResponse, ScopeEnum, SearchClient } from '../..';
import { copyIndex, HasCopyIndex } from '.';

export const copySettings = <TClient extends SearchClient>(
  base: TClient
): TClient & HasCopyIndex & HasCopySettings => {
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

export type HasCopySettings = {
  readonly copySettings: (
    from: string,
    to: string,
    requestOptions?: RequestOptions
  ) => Readonly<WaitablePromise<IndexOperationResponse>>;
};
