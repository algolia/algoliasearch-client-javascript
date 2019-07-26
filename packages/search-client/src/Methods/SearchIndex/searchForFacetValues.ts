import { RequestOptions } from '@algolia/transporter-types';
import { SearchIndex } from '../../SearchIndex';
import { Method } from '@algolia/requester-types';
import { ConstructorOf } from '../../helpers';

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

export interface HasSearchForFacetValues extends SearchIndex {
  readonly searchForFacetValues: (
    request: SearchForFacetValuesRequest,
    requestOptions?: RequestOptions
  ) => Promise<SearchForFacetValuesResponse>;
}

export type SearchForFacetValuesRequest = {
  readonly facetName: string;
  readonly facetQuery: string;
};

export type SearchForFacetValuesResponse = {
  readonly facetHits: readonly FacetHit[];
  readonly exhaustiveFacetsCount: boolean;
  readonly processingTimeMS?: number;
};

export type FacetHit = {
  readonly value: string;
  readonly highlighted: string;
  readonly count: number;
};
