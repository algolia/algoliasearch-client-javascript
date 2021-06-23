export const ApiKeyACLEnum: Readonly<Record<string, ApiKeyACLType>> = {
  AddObject: 'addObject',
  Analytics: 'analytics',
  Browser: 'browse',
  DeleteIndex: 'deleteIndex',
  DeleteObject: 'deleteObject',
  EditSettings: 'editSettings',
  ListIndexes: 'listIndexes',
  Logs: 'logs',
  Personalization: 'personalization',
  Recommendation: 'recommendation',
  Search: 'search',
  SeeUnretrievableAttributes: 'seeUnretrievableAttributes',
  Settings: 'settings',
  Usage: 'usage',
};

export type ApiKeyACLType =
  | 'addObject'
  | 'analytics'
  | 'browse'
  | 'deleteIndex'
  | 'deleteObject'
  | 'editSettings'
  | 'listIndexes'
  | 'logs'
  | 'personalization'
  | 'recommendation'
  | 'search'
  | 'seeUnretrievableAttributes'
  | 'settings'
  | 'usage';
