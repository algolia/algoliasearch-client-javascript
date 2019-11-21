import {
  multipleQueries,
  multipleSearchForFacetValues,
  search,
  searchForFacetValues,
} from '@algolia/client-search';

export const methods = {
  searchClient: { multipleQueries, multipleSearchForFacetValues },
  searchIndex: { search, searchForFacetValues },
};
