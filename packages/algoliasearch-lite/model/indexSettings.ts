import type { BaseIndexSettings } from './baseIndexSettings';
import type { IndexSettingsAsSearchParams } from './indexSettingsAsSearchParams';

/**
 * The Algolia index settings.
 */
export type IndexSettings = BaseIndexSettings & IndexSettingsAsSearchParams;
