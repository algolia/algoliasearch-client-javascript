import { RequestOptions } from '@algolia/transporter-types';
import { SearchIndex } from '../../SearchIndex';
import { Method } from '@algolia/requester-types';
import { ConstructorOf } from '../../helpers';
import { SearchForFacetValuesRequest } from '../Types/SearchForFacetValuesRequest';
import { SearchForFacetValuesResponse } from '../Types/SearchForFacetValuesResponse';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const searchForFacetValues = <TSearchIndex extends ConstructorOf<SearchIndex>>(
  base: TSearchIndex
) => {
  return class extends base implements HasSearchForFacetValues {
    public searchForFacetValues(
      request: SearchForFacetValuesRequest,
      requestOptions?: RequestOptions
    ): Promise<SearchForFacetValuesResponse> {
      return this.transporter.read(
        {
          method: Method.Post,
          path: `1/indexes/${this.indexName}/facets/${request.facetName}/query`,
          data: {
            facetQuery: request.facetQuery,
          },
        },
        requestOptions
      );
    }
  };
};

export type HasSearchForFacetValues = SearchIndex & {
  readonly searchForFacetValues: (
    request: SearchForFacetValuesRequest,
    requestOptions?: RequestOptions
  ) => Promise<SearchForFacetValuesResponse>;
};
