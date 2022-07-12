// This file is generated, manual changes will be lost - read more on https://github.com/algolia/api-clients-automation.

import type { AutomaticFacetFilters } from './automaticFacetFilters';
import type { ConsequenceQuery } from './consequenceQuery';
import type { RenderingContent } from './renderingContent';

/**
 * Additional search parameters. Any valid search parameter is allowed.
 */
export type Params = {
  query?: ConsequenceQuery;
  automaticFacetFilters?: AutomaticFacetFilters;
  automaticOptionalFacetFilters?: AutomaticFacetFilters;
  renderingContent?: RenderingContent;
};
