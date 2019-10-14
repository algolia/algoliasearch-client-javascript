import { RequestOptions } from '@algolia/transporter-types';
import { SearchIndex } from '../../SearchIndex';
import { ConstructorOf } from '@algolia/support';
import { BrowsablePromise } from '../../BrowsablePromise';
import { BrowseOptions } from '../types/BrowseOptions';
import { Synonym } from '../types/Synonym';
import { SearchSynonymsOptions } from '../types/SearchSynonymsOptions';
import { searchSynonyms, HasSearchSynonyms } from './searchSynonyms';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const browseSynonyms = <TSearchIndex extends ConstructorOf<SearchIndex>>(
  base: TSearchIndex
) => {
  const Mixin: ConstructorOf<SearchIndex & HasSearchSynonyms> = searchSynonyms(base);

  return class extends Mixin implements HasBrowseSynonyms {
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
            // eslint-disable-next-line functional/immutable-data,no-param-reassign
            response.hits = response.hits.map(synonym => {
              // eslint-disable-next-line functional/immutable-data,no-param-reassign
              delete synonym._highlightResult;

              return synonym;
            });

            return response;
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
