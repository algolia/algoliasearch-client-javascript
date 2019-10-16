import { AutomaticFacetFilter } from './AutomaticFacetFilter';
import { ConsequenceQuery } from './ConsequenceQuery';

export type ConsequenceParams = {
  /**
   * When providing a string, it replaces the entire query string.
   * When providing an object, it describes incremental edits to be made to the query string (but you can’t do both).
   */
  readonly query?: ConsequenceQuery | string | ReadonlyMap<string, readonly string[]>;

  /** Names of facets to which automatic filtering must be applied; they must match the facet name of a facet value placeholder in the query pattern. */
  readonly automaticFacetFilters?: readonly AutomaticFacetFilter[] | readonly string[];

  /**
   * Same syntax as automaticFacetFilters, but the engine treats the filters as optional.
   * Behaves like optionalFilters.
   */
  readonly automaticOptionalFacetFilters?: readonly AutomaticFacetFilter[];
};
