export type IndicesInSameAppError = Error & {
  readonly appId: string;
};
