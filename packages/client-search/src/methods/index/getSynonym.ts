import { encode } from '@algolia/client-common';
import { MethodEnum } from '@algolia/requester-common/src/types/MethodType';
import { RequestOptions } from '@algolia/transporter/src/types/RequestOptions';

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
          method: MethodEnum.Get,
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
