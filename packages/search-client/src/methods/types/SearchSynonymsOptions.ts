import { SynonymType } from './SynonymType';

export type SearchSynonymsOptions = {
  readonly type?: SynonymType;
  readonly page?: number;
  readonly hitsPerPage?: number;
};
