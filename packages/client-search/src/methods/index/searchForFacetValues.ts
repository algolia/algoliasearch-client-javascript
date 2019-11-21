import { encode } from '@algolia/client-common';
import { MethodEnum } from '@algolia/requester-common';
import { RequestOptions } from '@algolia/transporter';

import { SearchForFacetValuesResponse, SearchIndex, SearchOptions } from '../..';

export const searchForFacetValues = (base: SearchIndex) => {
  return (
    facetName: string,
    facetQuery: string,
    requestOptions?: RequestOptions & SearchOptions
  ): Readonly<Promise<SearchForFacetValuesResponse>> => {
    return base.transporter.read(
      {
        method: MethodEnum.Post,
        path: encode('1/indexes/%s/facets/%s/query', base.indexName, facetName),
        data: {
          facetQuery,
        },
        cacheable: true,
      },
      requestOptions
    );
  };
};
