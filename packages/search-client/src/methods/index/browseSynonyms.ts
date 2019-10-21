import { ConstructorOf } from '@algolia/support';
import { RequestOptions } from '@algolia/transporter';

import { BrowsablePromise } from '../../BrowsablePromise';
import { SearchIndex } from '../../SearchIndex';
import { BrowseOptions } from '../types/BrowseOptions';
import { SearchSynonymsOptions } from '../types/SearchSynonymsOptions';
import { Synonym } from '../types/Synonym';
import { HasSearchSynonyms, searchSynonyms } from './searchSynonyms';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const browseSynonyms = <TSearchIndex extends ConstructorOf<SearchIndex>>(
  base: TSearchIndex
) => {
  const mixin: ConstructorOf<SearchIndex & HasSearchSynonyms> = searchSynonyms(base);

  return class extends mixin implements HasBrowseSynonyms {
    public browseSynonyms(
      requestOptions?: SearchSynonymsOptions & BrowseOptions<Synonym> & RequestOptions
    ): Readonly<BrowsablePromise<Synonym>> {
      const hitsPerPage =
        requestOptions.hitsPerPage === undefined ? 1000 : requestOptions.hitsPerPage;

      return BrowsablePromise.from<Synonym>({
        ...requestOptions,
        shouldStop: response => response.hits.length < hitsPerPage,
        request: (data: { readonly query: string }) => {
          return this.searchSynonyms(data.query, requestOptions).then(response => {
            return {
              ...response,
              hits: response.hits.map(synonym => {
                // @ts-ignore
                // eslint-disable-next-line functional/immutable-data,no-param-reassign
                delete synonym._highlightResult;

                return synonym;
              }),
            };
          });
        },
      });
    }
  };
};

export type HasBrowseSynonyms = {
  readonly browseSynonyms: (
    requestOptions?: SearchSynonymsOptions & BrowseOptions<Synonym> & RequestOptions
  ) => Readonly<BrowsablePromise<Synonym>>;
};
