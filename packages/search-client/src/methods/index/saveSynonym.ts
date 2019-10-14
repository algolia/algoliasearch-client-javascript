import { RequestOptions } from '@algolia/transporter-types';
import { SearchIndex } from '../../SearchIndex';
import { ConstructorOf, WaitablePromise } from '@algolia/support';
import { saveSynonyms, HasSaveSynonyms } from './saveSynonyms';
import { SaveSynonymsResponse } from '../types/SaveSynonymsResponse';
import { SaveSynonymsOptions } from '../types/SaveSynonymsOptions';
import { Synonym } from '../types/Synonym';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const saveSynonym = <TSearchIndex extends ConstructorOf<SearchIndex>>(
  base: TSearchIndex
) => {
  const Mixin: ConstructorOf<SearchIndex & HasSaveSynonyms> = saveSynonyms(base);

  return class extends Mixin implements HasSaveSynonym {
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
