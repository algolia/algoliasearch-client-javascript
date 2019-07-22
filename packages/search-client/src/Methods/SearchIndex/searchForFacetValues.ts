import { RequestOptions } from '@algolia/transporter-types';
import { SearchIndex } from '../../SearchIndex';
import { Method } from '@algolia/requester-types';
import { ConstructorOf } from '../../helpers';

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

export interface HasSearchForFacetValues extends SearchIndex {
  searchForFacetValues(
    request: SearchForFacetValuesRequest,
    requestOptions?: RequestOptions
  ): Promise<SearchForFacetValuesResponse>;
}

export type SearchForFacetValuesRequest = {
  facetName: string;
  facetQuery: string;
};

export type SearchForFacetValuesResponse = {
  facetHits: FacetHit[];
  exhaustiveFacetsCount: boolean;
  processingTimeMS?: number;
};

export type FacetHit = {
  value: string;
  highlighted: string;
  count: number;
};
