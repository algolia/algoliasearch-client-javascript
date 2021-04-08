export type RequireAtLeastOne<TType> = {
  [TKey in keyof TType]-?: Required<Pick<TType, TKey>> &
    Partial<Pick<TType, Exclude<keyof TType, TKey>>>;
}[keyof TType];
