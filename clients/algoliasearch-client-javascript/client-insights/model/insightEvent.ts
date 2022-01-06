/**
 * Insights event.
 */
export type InsightEvent = {
  /**
   * An eventType can be a click, a conversion, or a view.
   */
  eventType: InsightEvent.EventTypeEnum;
  /**
   * A user-defined string used to categorize events.
   */
  eventName: string;
  /**
   * Name of the targeted index.
   */
  index: string;
  /**
   * A user identifier. Depending if the user is logged-in or not, several strategies can be used from a sessionId to a technical identifier.
   */
  userToken: string;
  /**
   * Time of the event expressed in milliseconds since the Unix epoch.
   */
  timestamp?: number;
  /**
   * Algolia queryID. This is required when an event is tied to a search.
   */
  queryID?: string;
  /**
   * An array of index objectID. Limited to 20 objects. An event can’t have both objectIDs and filters at the same time.
   */
  objectIDs?: string[];
  /**
   * An array of filters. Limited to 10 filters. An event can’t have both objectIDs and filters at the same time.
   */
  filters?: string[];
  /**
   * Position of the click in the list of Algolia search results. This field is required if a queryID is provided. One position must be provided for each objectID.
   */
  positions?: number[];
};

export namespace InsightEvent {
  export enum EventTypeEnum {
    Click = 'click',
    Conversion = 'conversion',
    View = 'view',
  }
}
