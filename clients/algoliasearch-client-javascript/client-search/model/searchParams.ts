import type { BaseSearchParams } from './baseSearchParams';
import type { IndexSettingsAsSearchParams } from './indexSettingsAsSearchParams';

export type SearchParams = BaseSearchParams & IndexSettingsAsSearchParams;
