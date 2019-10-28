import { ConstructorOf, WaitablePromise } from '@algolia/support';
import { RequestOptions } from '@algolia/transporter';

import { SearchIndex } from '../../SearchIndex';
import { SaveSynonymsOptions } from '../types/SaveSynonymsOptions';
import { SaveSynonymsResponse } from '../types/SaveSynonymsResponse';
import { Synonym } from '../types/Synonym';
import { HasSaveSynonyms, saveSynonyms } from './saveSynonyms';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const saveSynonym = <TSearchIndex extends ConstructorOf<SearchIndex>>(
  base: TSearchIndex
) => {
  const mixin: ConstructorOf<SearchIndex & HasSaveSynonyms> = saveSynonyms(base);

  return class extends mixin implements HasSaveSynonym {
    public saveSynonym(
      synonym: Synonym,
      requestOptions?: RequestOptions & SaveSynonymsOptions
    ): Readonly<WaitablePromise<SaveSynonymsResponse>> {
      return this.saveSynonyms([synonym], requestOptions);
    }
  };
};

export type HasSaveSynonym = {
  readonly saveSynonym: (
    synonym: Synonym,
    requestOptions?: SaveSynonymsOptions & RequestOptions
  ) => Readonly<WaitablePromise<SaveSynonymsResponse>>;
};
