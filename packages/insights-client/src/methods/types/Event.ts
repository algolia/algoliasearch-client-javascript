import { EventType } from './EventType';

export type Event = {
  readonly eventType?: EventType;
  readonly eventName?: string;
  readonly index?: string;
  readonly userToken?: string;
  readonly timestamp?: number;
  readonly queryID?: string;
  readonly objectIDs?: readonly string[];
  readonly filters?: readonly string[];
  readonly positions?: readonly number[];
};
