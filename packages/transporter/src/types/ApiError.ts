export type ApiError = Error & {
  readonly status: number;
};
