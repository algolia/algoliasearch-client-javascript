import { addMethod } from '@algolia/client-common';
import { RequestOptions } from '@algolia/transporter';

import {
  BrowseOptions,
  BrowseResponse,
  createBrowsablePromise,
  SearchIndex,
  SearchSynonymsOptions,
  Synonym,
} from '../..';
import { searchSynonyms } from '.';

export const browseSynonyms = <TSearchIndex extends SearchIndex>(
  base: TSearchIndex
): TSearchIndex & HasBrowseSynonyms => {
  return {
    ...base,
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
          return addMethod(base, searchSynonyms)
            .searchSynonyms('', { ...requestOptions, ...data })
            .then(
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
