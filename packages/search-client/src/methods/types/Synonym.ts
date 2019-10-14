import { SynonymType } from './SynonymType';

export type Synonym = {
  /* eslint-disable functional/prefer-readonly-type */
  objectID: string;
  type: SynonymType;
  synonyms?: string[];
  input?: string;
  word?: string;
  corrections?: string[];
  placeholder?: string;
  replacements?: string[];
};
