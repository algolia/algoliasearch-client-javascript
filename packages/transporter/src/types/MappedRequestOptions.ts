export type MappedRequestOptions = {
  readonly cacheable: boolean | undefined;
  readonly timeout: number | undefined;

  // eslint-disable-next-line functional/prefer-readonly-type
  readonly headers: { [key: string]: string };

  // eslint-disable-next-line functional/prefer-readonly-type
  readonly queryParameters: { [key: string]: any };

  // eslint-disable-next-line functional/prefer-readonly-type
  readonly data?: { [key: string]: string };
};
