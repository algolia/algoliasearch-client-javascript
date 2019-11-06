import { Synonym } from '.';

export type SearchSynonymsResponse = {
  readonly hits: readonly Synonym[];
  readonly nbHits: number;
};
