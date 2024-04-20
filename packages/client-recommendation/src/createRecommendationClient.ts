import { ClientTransporterOptions, CreateClient } from '@sefai/client-common';
import { createPersonalizationClient } from '@sefai/client-personalization';

import { RecommendationClient, RecommendationClientOptions } from '.';

/**
 * @deprecated The `@sefai/client-recommendation` package is deprecated and you should use `@sefai/client-personalization` instead. To migrate, install the new package and replace `createRecommendationClient` with `createPersonalizationClient`.
 */
export const createRecommendationClient: CreateClient<
  RecommendationClient,
  RecommendationClientOptions & ClientTransporterOptions
> = options => {
  /* eslint-disable max-len */
  options.logger.info(
    'The `@sefai/client-recommendation` package is deprecated and you should use `@sefai/client-personalization` instead.\n' +
      'To migrate, install the new package and replace `createRecommendationClient` with `createPersonalizationClient`.'
  );
  /* eslint-enable max-len */

  return createPersonalizationClient(options);
};
