import { BaseSearchParams } from './baseSearchParams';
import { IndexSettingsAsSearchParams } from './indexSettingsAsSearchParams';

export type SearchParams = BaseSearchParams & IndexSettingsAsSearchParams;
