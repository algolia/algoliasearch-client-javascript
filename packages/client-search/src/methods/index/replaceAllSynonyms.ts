import { WaitablePromise } from '@algolia/client-common';
import { RequestOptions } from '@algolia/transporter';

import { SaveSynonymsResponse, SearchIndex, Synonym } from '../..';
import { HasSaveSynonyms, saveSynonyms } from '.';

export const replaceAllSynonyms = <TSearchIndex extends SearchIndex>(
  base: TSearchIndex
): TSearchIndex & HasSaveSynonyms & HasReplaceAllSynonyms => {
  return {
    ...saveSynonyms(base),
    replaceAllSynonyms(
      synonyms: readonly Synonym[],
      requestOptions?: RequestOptions
    ): Readonly<WaitablePromise<SaveSynonymsResponse>> {
      return this.saveSynonyms(synonyms, {
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
