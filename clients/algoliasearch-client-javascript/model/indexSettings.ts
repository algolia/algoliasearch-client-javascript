import { BaseIndexSettings } from './baseIndexSettings';
import { IndexSettingsAsSearchParams } from './indexSettingsAsSearchParams';

export type IndexSettings = BaseIndexSettings & IndexSettingsAsSearchParams;
