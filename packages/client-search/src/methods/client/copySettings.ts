import { addMethod, WaitablePromise } from '@algolia/client-common';
import { RequestOptions } from '@algolia/transporter';

import { IndexOperationResponse, ScopeEnum, SearchClient } from '../..';
import { copyIndex } from '.';

export const copySettings = <TClient extends SearchClient>(
  base: TClient
): TClient & HasCopySettings => {
  return {
    ...base,
    copySettings(
      from: string,
      to: string,
      requestOptions?: RequestOptions
    ): Readonly<WaitablePromise<IndexOperationResponse>> {
      return addMethod(base, copyIndex).copyIndex(from, to, {
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
