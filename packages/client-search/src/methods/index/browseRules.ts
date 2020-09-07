import { RequestOptions } from '@algolia/transporter';

import {
  BrowseOptions,
  BrowseResponse,
  createBrowsablePromise,
  Rule,
  SearchIndex,
  searchRules,
  SearchRulesOptions,
} from '../..';

export const browseRules = (base: SearchIndex) => {
  return (
    requestOptions?: SearchRulesOptions & BrowseOptions<Rule> & RequestOptions
  ): Readonly<Promise<void>> => {
    const options = {
      hitsPerPage: 1000,
      ...requestOptions,
    };

    return createBrowsablePromise<Rule>({
      shouldStop: response => response.hits.length < options.hitsPerPage,
      ...options,
      request(data) {
        return searchRules(base)('', { ...options, ...data }).then(
          (response): BrowseResponse<Rule> => {
            return {
              ...response,
              hits: response.hits.map(rule => {
                // eslint-disable-next-line functional/immutable-data,no-param-reassign
                delete (rule as any)._highlightResult;

                return rule;
              }),
            };
          }
        );
      },
    });
  };
};
