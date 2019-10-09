import { RequestOptions } from '@algolia/transporter-types';
import { InsightsClient } from '../../InsightsClient';
import { Method } from '@algolia/requester-types';
import { ConstructorOf } from '@algolia/support';
import { SendEventResponse } from '../types/SendEventResponse';
import { Event } from '../types/Event';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const sendEvent = <TInsightsClient extends ConstructorOf<InsightsClient>>(
  base: TInsightsClient
) => {
  return class extends base implements HasSendEvent {
    public sendEvent(
      event: Event,
      requestOptions?: RequestOptions
    ): Readonly<Promise<SendEventResponse>> {
      const events = [event];

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

export type HasSendEvent = InsightsClient & {
  readonly sendEvent: (
    event: Event,
    requestOptions?: RequestOptions
  ) => Readonly<Promise<SendEventResponse>>;
};
