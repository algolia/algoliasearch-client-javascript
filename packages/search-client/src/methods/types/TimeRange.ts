export type TimeRange = {
  /* eslint-disable functional/prefer-readonly-type */

  /** DateTime with UTC offset for Serialization/Deserialization in unix timespam */
  from: number;

  /** DateTime with UTC offset for Serialization/Deserialization in unix timespam */
  until: number;
};
