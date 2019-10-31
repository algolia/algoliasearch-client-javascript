import { WaitablePromise } from '@algolia/client-common/types/WaitablePromise';
import { RequestOptions } from '@algolia/transporter/types/RequestOptions';
import { TransporterAware } from '@algolia/transporter/types/TransporterAware';

import { IndexOperationResponse } from '../../types/IndexOperationResponse';
import { ScopeEnum } from '../../types/ScopeType';
import { copyIndex, HasCopyIndex } from './copyIndex';

export const copySynonyms = <TClient extends TransporterAware>(
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
