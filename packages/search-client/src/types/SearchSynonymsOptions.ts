import { SynonymType } from './SynonymType';

export type SearchSynonymsOptions = {
  readonly query?: string;
  readonly type?: SynonymType;
  readonly page?: number;
  readonly hitsPerPage?: number;
};
