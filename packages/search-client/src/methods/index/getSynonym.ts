import { Method } from '@algolia/requester-types';
import { ConstructorOf, encode } from '@algolia/support';
import { RequestOptions } from '@algolia/transporter-types';

import { SearchIndex } from '../../SearchIndex';
import { Synonym } from '../types/Synonym';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const getSynonym = <TSearchIndex extends ConstructorOf<SearchIndex>>(base: TSearchIndex) => {
  return class extends base implements HasGetSynonym {
    public getSynonym(
      objectID: string,
      requestOptions?: RequestOptions
    ): Readonly<Promise<Synonym>> {
      return this.transporter.read(
        {
          method: Method.Get,
          path: encode(`1/indexes/%s/synonyms/%s`, this.indexName, objectID),
        },
        requestOptions
      );
    }
  };
};

export type HasGetSynonym = {
  readonly getSynonym: <TObject>(
    objectID: string,
    requestOptions?: RequestOptions
  ) => Readonly<Promise<Synonym>>;
};
