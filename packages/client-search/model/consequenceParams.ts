import type { BaseSearchParams } from './baseSearchParams';
import type { IndexSettingsAsSearchParams } from './indexSettingsAsSearchParams';
import type { Params } from './params';

export type ConsequenceParams = BaseSearchParams &
  IndexSettingsAsSearchParams &
  Params;
