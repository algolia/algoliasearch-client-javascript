// This file is generated, manual changes will be lost - read more on https://github.com/algolia/api-clients-automation.

import type { SourceIndex } from './sourceIndex';

export type QuerySuggestionsIndexParam = {
  /**
   * List of source indices used to generate a Query Suggestions index.
   */
  sourceIndices: SourceIndex[];

  /**
   * De-duplicate singular and plural suggestions. For example, let\'s say your index contains English content, and that two suggestions “shoe” and “shoes” end up in your Query Suggestions index. If the English language is configured, only the most popular of those two suggestions would remain.
   */
  languages?: string[];

  /**
   * List of words and patterns to exclude from the Query Suggestions index.
   */
  exclude?: string[];
};
