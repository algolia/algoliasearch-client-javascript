import { RequestOptions } from '@algolia/transporter-types';
import { SearchIndex } from '../../SearchIndex';
import { Method } from '@algolia/requester-types';
import { ConstructorOf } from '../../helpers';

export const search = <TSearchIndex extends ConstructorOf<SearchIndex>>(base: TSearchIndex) => {
  return class extends base implements HasSearch {
    public search<THit>(
      request: SearchRequest,
      requestOptions?: RequestOptions
    ): Promise<SearchResponse<THit>> {
      return this.transporter.read(
        {
          method: Method.Post,
          path: `1/indexes/${this.indexName}/query`,
          data: request,
        },
        requestOptions
      );
    }
  };
};

export interface HasSearch extends SearchIndex {
  search<THit>(
    request: SearchRequest,
    requestOptions?: RequestOptions
  ): Promise<SearchResponse<THit>>;
}

export type SearchRequest = {
  query: string;
};

export type SearchResponse<THit> = {
  hits: THit[];
};
