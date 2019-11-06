import { RequestOptions } from '@algolia/transporter';

import {
  BrowseOptions,
  BrowseResponse,
  createBrowsablePromise,
  SearchIndex,
  SearchSynonymsOptions,
  Synonym,
} from '../..';
import { HasSearchSynonyms, searchSynonyms } from '.';

export const browseSynonyms = <TSearchIndex extends SearchIndex>(
  base: TSearchIndex
): TSearchIndex & HasSearchSynonyms & HasBrowseSynonyms => {
  return {
    ...searchSynonyms(base),
    browseSynonyms(
      requestOptions?: SearchSynonymsOptions & BrowseOptions<Synonym> & RequestOptions
    ): Readonly<Promise<void>> {
      const options = {
        hitsPerPage: 1000,
        ...requestOptions,
      };

      return createBrowsablePromise<Synonym>({
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
    },
  };
};

export type HasBrowseSynonyms = {
  readonly browseSynonyms: (
    requestOptions?: SearchSynonymsOptions & BrowseOptions<Synonym> & RequestOptions
  ) => Readonly<Promise<void>>;
};
