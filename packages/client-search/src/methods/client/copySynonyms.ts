import { WaitablePromise } from '@algolia/client-common';
import { RequestOptions, TransporterAware } from '@algolia/transporter';

import { IndexOperationResponse, ScopeEnum } from '../..';
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
