import { ConstructorOf } from '@algolia/support';
import { RequestOptions } from '@algolia/transporter';

import { BrowsablePromise } from '../../BrowsablePromise';
import { SearchIndex } from '../../SearchIndex';
import { BrowseOptions } from '../types/BrowseOptions';
import { BrowseResponse } from '../types/BrowseResponse';
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
      const options = {
        hitsPerPage: 1000,
        ...requestOptions,
      };

      return BrowsablePromise.from<Synonym>({
        ...options,
        shouldStop: response => response.hits.length < options.hitsPerPage,
        request: data => {
          return this.searchSynonyms('', { ...requestOptions, ...data }).then(
            (response): BrowseResponse<Synonym> => {
              return {
                ...response,
                hits: response.hits.map(synonym => {
                  // @ts-ignore
                  // eslint-disable-next-line functional/immutable-data,no-param-reassign
                  delete synonym._highlightResult;

                  return synonym;
                }),
              };
            }
          );
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
