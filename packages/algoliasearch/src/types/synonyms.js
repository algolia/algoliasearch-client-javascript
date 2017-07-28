// @flow

export type SimpleSynonym = {|
  objectID: string,
  type: 'synonym',
  synonyms: string[],
|};

export type OneWaySynonym = {|
  objectID: string,
  type: 'onewaysynonym',
  input: string,
  synonyms: string[],
|};

export type AltCorrectionSynonym = {|
  objectID: string,
  type: 'altcorrection1' | 'altcorrection2',
  word: string,
  corrections: string[],
|};

export type PlaceholderSynonym = {|
  objectID: string,
  type: 'placeholder',
  placeholder: string,
  replacements: string[],
|};

export type Synonym =
  | SimpleSynonym
  | OneWaySynonym
  | AltCorrectionSynonym
  | PlaceholderSynonym;
