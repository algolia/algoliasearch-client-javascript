import { SynonymType } from '.';

export type Synonym = {
  readonly objectID: string;
  readonly type: SynonymType;
  readonly synonyms?: readonly string[];
  readonly input?: string;
  readonly word?: string;
  readonly corrections?: readonly string[];
  readonly placeholder?: string;
  readonly replacements?: readonly string[];
};
