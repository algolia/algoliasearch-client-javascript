import type { BaseSearchParams } from './baseSearchParams';
import type { IndexSettingsAsSearchParams } from './indexSettingsAsSearchParams';
import type { RequiredSearchParams } from './requiredSearchParams';

export type SearchParams = BaseSearchParams &
  IndexSettingsAsSearchParams &
  RequiredSearchParams;
