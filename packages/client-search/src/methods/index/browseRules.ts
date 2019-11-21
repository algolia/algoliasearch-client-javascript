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
      ...options,
      shouldStop: response => response.hits.length < options.hitsPerPage,
      request: data => {
        return searchRules(base)('', { ...requestOptions, ...data }).then(
          (response): BrowseResponse<Rule> => {
            return {
              ...response,
              hits: response.hits.map(rule => {
                // @ts-ignore
                // eslint-disable-next-line functional/immutable-data,no-param-reassign
                delete rule._highlightResult;

                return rule;
              }),
            };
          }
        );
      },
    });
  };
};
