export const SynonymEnum: { readonly [key: string]: SynonymType } = {
  Synonym: 'synonym',
  OneWaySynonym: 'oneWaySynonym',
  AltCorrection1: 'altCorrection1',
  AltCorrection2: 'altCorrection2',
  Placeholder: 'placeholder',
};

export type SynonymType =
  | 'synonym'
  | 'oneWaySynonym'
  | 'altCorrection1'
  | 'altCorrection2'
  | 'placeholder';
