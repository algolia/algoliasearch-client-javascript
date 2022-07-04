import type { BaseSearchParamsWithoutQuery } from './baseSearchParamsWithoutQuery';
import type { IndexSettingsAsSearchParams } from './indexSettingsAsSearchParams';
import type { Params } from './params';

export type ConsequenceParams = BaseSearchParamsWithoutQuery &
  IndexSettingsAsSearchParams &
  Params;
