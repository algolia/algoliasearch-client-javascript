import { RequestOptions } from '@algolia/transporter-types';
import { UserInsightsClient } from '../../UserInsightsClient';
import { EventEnum } from '../types/EventType';
import { ConstructorOf } from '@algolia/support';
import { SendEventResponse } from '../types/SendEventResponse';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const viewedFilters = <TUserInsightsClient extends ConstructorOf<UserInsightsClient>>(
  base: TUserInsightsClient
) => {
  return class extends base implements HasViewedFilters {
    public viewedFilters(
      event: ViewedFiltersEvent,
      requestOptions?: RequestOptions
    ): Readonly<Promise<SendEventResponse>> {
      return this.client.sendEvent(
        {
          eventType: EventEnum.Click,
          eventName: event.eventName,
          index: event.indexName,
          userToken: this.userToken,
          filters: event.filters,
        },
        requestOptions
      );
    }
  };
};

export type HasViewedFilters = UserInsightsClient & {
  readonly viewedFilters: (
    event: ViewedFiltersEvent,
    requestOptions?: RequestOptions
  ) => Readonly<Promise<SendEventResponse>>;
};
