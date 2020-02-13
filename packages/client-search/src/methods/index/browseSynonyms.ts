import { RequestOptions } from '@algolia/transporter';

import {
  BrowseOptions,
  BrowseResponse,
  createBrowsablePromise,
  SearchIndex,
  searchSynonyms,
  SearchSynonymsOptions,
  Synonym,
} from '../..';

export const browseSynonyms = (base: SearchIndex) => {
  return (
    requestOptions?: SearchSynonymsOptions & BrowseOptions<Synonym> & RequestOptions
  ): Readonly<Promise<void>> => {
    const options = {
      hitsPerPage: 1000,
      ...requestOptions,
    };

    return createBrowsablePromise<Synonym>({
      ...options,
      shouldStop: response => response.hits.length < options.hitsPerPage,
      request(data) {
        return searchSynonyms(base)('', { ...options, ...data }).then(
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
  };
};
