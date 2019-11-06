import { RequestOptions } from '@algolia/transporter';

import {
  BrowseOptions,
  BrowseResponse,
  createBrowsablePromise,
  Rule,
  SearchIndex,
  SearchRulesOptions,
} from '../..';
import { HasSearchRules, searchRules } from '.';

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
