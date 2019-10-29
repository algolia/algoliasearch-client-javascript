import { WaitablePromise } from '@algolia/client-common/src/types/WaitablePromise';
import { RequestOptions } from '@algolia/transporter';

import { SaveSynonymsResponse } from '../../types/SaveSynonymsResponse';
import { SearchIndex } from '../../types/SearchIndex';
import { Synonym } from '../../types/Synonym';
import { HasSaveSynonyms, saveSynonyms } from './saveSynonyms';

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
