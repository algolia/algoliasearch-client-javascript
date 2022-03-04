import type { TopSearchesResponse } from './topSearchesResponse';
import type { TopSearchesResponseWithAnalytics } from './topSearchesResponseWithAnalytics';

export type GetTopSearchesResponse =
  | TopSearchesResponse
  | TopSearchesResponseWithAnalytics;
