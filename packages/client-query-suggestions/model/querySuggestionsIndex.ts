import type { SourceIndiceWithReplicas } from './sourceIndiceWithReplicas';

export type QuerySuggestionsIndex = {
  /**
   * Index name to target.
   */
  indexName: string;
  /**
   * List of source indices used to generate a Query Suggestions index.
   */
  sourceIndices: SourceIndiceWithReplicas[];
  /**
   * De-duplicate singular and plural suggestions. For example, let\'s say your index contains English content, and that two suggestions “shoe” and “shoes” end up in your Query Suggestions index. If the English language is configured, only the most popular of those two suggestions would remain.
   */
  languages: string[];
  /**
   * List of words and patterns to exclude from the Query Suggestions index.
   */
  exclude: string[];
};