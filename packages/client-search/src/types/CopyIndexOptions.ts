export const ScopeEnum: Readonly<Record<string, ScopeType>> = {
  Settings: 'settings',
  Synonyms: 'synonyms',
  Rules: 'rules',
};

export type ScopeType = 'settings' | 'synonyms' | 'rules';

export type CopyIndexOptions = {
  readonly scope?: readonly ScopeType[];
};
