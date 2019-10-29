import { Method } from '@algolia/requester-types/src/types/Method';
import { encode } from '@algolia/support';
import { RequestOptions } from '@algolia/transporter';

import { SearchIndex } from '../../types/SearchIndex';
import { Synonym } from '../../types/Synonym';

export const getSynonym = <TSearchIndex extends SearchIndex>(
  base: TSearchIndex
): TSearchIndex & HasGetSynonym => {
  return {
    ...base,
    getSynonym(objectID: string, requestOptions?: RequestOptions): Readonly<Promise<Synonym>> {
      return this.transporter.read(
        {
          method: Method.Get,
          path: encode(`1/indexes/%s/synonyms/%s`, this.indexName, objectID),
        },
        requestOptions
      );
    },
  };
};

export type HasGetSynonym = {
  readonly getSynonym: (
    objectID: string,
    requestOptions?: RequestOptions
  ) => Readonly<Promise<Synonym>>;
};
