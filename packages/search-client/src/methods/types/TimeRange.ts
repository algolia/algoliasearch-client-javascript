export type TimeRange = {
  /** DateTime with UTC offset for Serialization/Deserialization in unix timespam */
  readonly from: number;

  /** DateTime with UTC offset for Serialization/Deserialization in unix timespam */
  readonly until: number;
};
