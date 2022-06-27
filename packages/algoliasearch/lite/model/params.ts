import type { AutomaticFacetFilters } from './automaticFacetFilters';
import type { RenderingContent } from './renderingContent';
import type { SchemasQuery } from './schemasQuery';

/**
 * Additional search parameters. Any valid search parameter is allowed.
 */
export type Params = {
  query?: SchemasQuery;
  automaticFacetFilters?: AutomaticFacetFilters;
  automaticOptionalFacetFilters?: AutomaticFacetFilters;
  renderingContent?: RenderingContent;
};
