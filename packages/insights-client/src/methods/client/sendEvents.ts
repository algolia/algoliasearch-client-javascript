import { Method } from '@algolia/requester-types';
import { ConstructorOf } from '@algolia/support';
import { RequestOptions } from '@algolia/transporter-types';

import { InsightsClient } from '../../InsightsClient';
import { Event } from '../types/Event';
import { SendEventsResponse } from '../types/SendEventsResponse';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const sendEvents = <TInsightsClient extends ConstructorOf<InsightsClient>>(
  base: TInsightsClient
) => {
  return class extends base implements HasSendEvents {
    public sendEvents(
      events: readonly Event[],
      requestOptions?: RequestOptions
    ): Readonly<Promise<SendEventsResponse>> {
      return this.transporter.write(
        {
          method: Method.Post,
          path: `1/events`,
          data: {
            events,
          },
        },
        requestOptions
      );
    }
  };
};

export type HasSendEvents = InsightsClient & {
  readonly sendEvents: (
    events: readonly Event[],
    requestOptions?: RequestOptions
  ) => Readonly<Promise<SendEventsResponse>>;
};
