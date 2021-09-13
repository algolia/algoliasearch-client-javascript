import { ClientTransporterOptions, CreateClient } from '@algolia/client-common';
import { createPersonalizationClient } from '@algolia/client-personalization';

import { RecommendationClient, RecommendationClientOptions } from '.';

/**
 * @deprecated The `@algolia/client-recommendation` package is deprecated and you should use `@algolia/client-personalization` instead. To migrate, install the new package and replace `createRecommendationClient` with `createPersonalizationClient`.
 */
export const createRecommendationClient: CreateClient<
  RecommendationClient,
  RecommendationClientOptions & ClientTransporterOptions
> = options => {
  /* eslint-disable max-len */
  options.logger.info(
    'The `@algolia/client-recommendation` package is deprecated and you should use `@algolia/client-personalization` instead.\n' +
      'To migrate, install the new package and replace `createRecommendationClient` with `createPersonalizationClient`.'
  );
  /* eslint-enable max-len */

  return createPersonalizationClient(options);
};
