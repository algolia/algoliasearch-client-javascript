import { RequestOptions } from '@algolia/transporter';

import { createBrowsablePromise } from '../../createBrowsablePromise';
import { BrowseOptions } from '../../types/BrowseOptions';
import { BrowseResponse } from '../../types/BrowseResponse';
import { Rule } from '../../types/Rule';
import { SearchIndex } from '../../types/SearchIndex';
import { SearchRulesOptions } from '../../types/SearchRulesOptions';
import { HasSearchRules, searchRules } from './searchRules';

export const browseRules = <TSearchIndex extends SearchIndex>(
  base: TSearchIndex
): TSearchIndex & HasSearchRules & HasBrowseRules => {
  return {
    ...searchRules(base),
    browseRules(
      requestOptions?: SearchRulesOptions & BrowseOptions<Rule> & RequestOptions
    ): Readonly<Promise<void>> {
      const options = {
        hitsPerPage: 1000,
        ...requestOptions,
      };

      return createBrowsablePromise<Rule>({
        ...options,
        shouldStop: response => response.hits.length < options.hitsPerPage,
        request: data => {
          return this.searchRules('', { ...requestOptions, ...data }).then(
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
    },
  };
};

export type HasBrowseRules = {
  readonly browseRules: (
    requestOptions?: SearchRulesOptions & BrowseOptions<Rule> & RequestOptions
  ) => Readonly<Promise<void>>;
};
