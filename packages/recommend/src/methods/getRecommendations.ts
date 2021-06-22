import { SearchOptions } from '@algolia/client-search';
import { MethodEnum } from '@algolia/requester-common';

import { RecommendClient, RecommendModel, WithRecommendMethods } from '../types';

export type GetRecommendationsOptions = {
  readonly indexName: string;
  readonly model: RecommendModel;
  readonly objectID: string;
  readonly threshold?: number;
  readonly maxRecommendations?: number;
  readonly queryParameters?: SearchOptions;
  readonly fallbackParameters?: Pick<SearchOptions, 'facetFilters'>;
};

type GetRecommendations = (
  base: RecommendClient
) => WithRecommendMethods<RecommendClient>['getRecommendations'];

export const getRecommendations: GetRecommendations = base => {
  return (options, requestOptions) => {
    const requests: readonly GetRecommendationsOptions[] = [
      {
        // The `threshold` param is required by the endpoint to make it easier
        // to provide a default value later, so we default it in the client
        // so that users don't have to provide a value.
        threshold: 0,
        ...options,
      },
    ];

    return base.transporter.read(
      {
        method: MethodEnum.Post,
        path: '1/indexes/*/recommendations',
        data: {
          requests,
        },
        cacheable: true,
      },
      requestOptions
    );
  };
};
