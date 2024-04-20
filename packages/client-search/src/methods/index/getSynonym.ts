import { encode } from '@sefai/client-common';
import { MethodEnum } from '@sefai/requester-common';
import { RequestOptions } from '@sefai/transporter';

import { SearchIndex, Synonym } from '../..';

export const getSynonym = (base: SearchIndex) => {
  return (objectID: string, requestOptions?: RequestOptions): Readonly<Promise<Synonym>> => {
    return base.transporter.read(
      {
        method: MethodEnum.Get,
        path: encode(`1/indexes/%s/synonyms/%s`, base.indexName, objectID),
      },
      requestOptions
    );
  };
};
