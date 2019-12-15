export const ScopeEnum: { readonly [key: string]: ScopeType } = {
  Settings: 'settings',
  Synonyms: 'synonyms',
  Rules: 'rules',
};

export type ScopeType = 'settings' | 'synonyms' | 'rules';

export type CopyIndexOptions = {
  readonly scope?: readonly ScopeType[];
};
