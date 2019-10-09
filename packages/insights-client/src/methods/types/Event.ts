import { EventType } from './EventType';

export type Event = {
  /* eslint-disable functional/prefer-readonly-type */
  eventType?: EventType;
  eventName?: string;
  index?: string;
  userToken?: string;
  timestamp?: number;
  queryID?: string;
  objectIDs?: string[];
  filters?: string[];
  positions?: number[];
};
