// Code generated by OpenAPI Generator (https://openapi-generator.tech), manual changes will be lost - read more on https://github.com/algolia/api-clients-automation. DO NOT EDIT.

import type { EventsItems } from './eventsItems';

export type InsightsEvents = {
  /**
   * Click and conversion events.  **All** events must be valid, otherwise the API returns an error.
   */
  events: Array<EventsItems>;
};
