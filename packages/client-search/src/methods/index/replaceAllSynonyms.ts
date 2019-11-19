import { addMethod, WaitablePromise } from '@algolia/client-common';
import { RequestOptions } from '@algolia/transporter';

import { SaveSynonymsResponse, SearchIndex, Synonym } from '../..';
import { saveSynonyms } from '.';

export const replaceAllSynonyms = <TSearchIndex extends SearchIndex>(
  base: TSearchIndex
): TSearchIndex & HasReplaceAllSynonyms => {
  return {
    ...base,
    replaceAllSynonyms(
      synonyms: readonly Synonym[],
      requestOptions?: RequestOptions
    ): Readonly<WaitablePromise<SaveSynonymsResponse>> {
      return addMethod(base, saveSynonyms).saveSynonyms(synonyms, {
        ...(requestOptions === undefined ? {} : requestOptions),
        replaceExistingSynonyms: true,
      });
    },
  };
};

export type HasReplaceAllSynonyms = {
  readonly replaceAllSynonyms: (
    synonyms: readonly Synonym[],
    requestOptions?: RequestOptions
  ) => Readonly<WaitablePromise<SaveSynonymsResponse>>;
};
