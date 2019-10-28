import { ConstructorOf } from '@algolia/support';
import { RequestOptions } from '@algolia/transporter';

import { BrowsablePromise } from '../../BrowsablePromise';
import { SearchIndex } from '../../SearchIndex';
import { BrowseOptions } from '../types/BrowseOptions';
import { BrowseResponse } from '../types/BrowseResponse';
import { Rule } from '../types/Rule';
import { SearchRulesOptions } from '../types/SearchRulesOptions';
import { HasSearchRules, searchRules } from './searchRules';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const browseRules = <TSearchIndex extends ConstructorOf<SearchIndex>>(
  base: TSearchIndex
) => {
  const mixin: ConstructorOf<SearchIndex & HasSearchRules> = searchRules(base);

  return class extends mixin implements HasBrowseRules {
    public browseRules(
      requestOptions?: SearchRulesOptions & BrowseOptions<Rule> & RequestOptions
    ): Readonly<BrowsablePromise<Rule>> {
      const options = {
        hitsPerPage: 1000,
        ...requestOptions,
      };

      return BrowsablePromise.from<Rule>({
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
    }
  };
};

export type HasBrowseRules = {
  readonly browseRules: (
    requestOptions?: SearchRulesOptions & BrowseOptions<Rule> & RequestOptions
  ) => Readonly<BrowsablePromise<Rule>>;
};
