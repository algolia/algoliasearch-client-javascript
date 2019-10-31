import { WaitablePromise } from '@algolia/client-common/types/WaitablePromise';
import { RequestOptions } from '@algolia/transporter/types/RequestOptions';
import { TransporterAware } from '@algolia/transporter/types/TransporterAware';

import { IndexOperationResponse } from '../../types/IndexOperationResponse';
import { ScopeEnum } from '../../types/ScopeType';
import { copyIndex, HasCopyIndex } from './copyIndex';

export const copySettings = <TClient extends TransporterAware>(
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
