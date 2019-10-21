import { ConstructorOf, WaitablePromise } from '@algolia/support';
import { RequestOptions } from '@algolia/transporter';

import { SearchIndex } from '../../SearchIndex';
import { SaveSynonymsResponse } from '../types/SaveSynonymsResponse';
import { Synonym } from '../types/Synonym';
import { saveSynonyms } from './saveSynonyms';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const replaceAllSynonyms = <TSearchIndex extends ConstructorOf<SearchIndex>>(
  base: TSearchIndex
) => {
  const mixin = saveSynonyms(base);

  return class extends mixin implements HasReplaceAllSynonyms {
    public replaceAllSynonyms(
      synonyms: readonly Synonym[],
      requestOptions?: RequestOptions
    ): Readonly<WaitablePromise<SaveSynonymsResponse>> {
      return this.saveSynonyms(synonyms, {
        ...(requestOptions === undefined ? {} : requestOptions),
        replaceExistingSynonyms: true,
      });
    }
  };
};

export type HasReplaceAllSynonyms = {
  readonly replaceAllSynonyms: (
    synonyms: readonly Synonym[],
    requestOptions?: RequestOptions
  ) => Readonly<WaitablePromise<SaveSynonymsResponse>>;
};
