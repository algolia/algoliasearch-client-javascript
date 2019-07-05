export class RequestOptions {
  public timeout?: number;

  public constructor(options: Options) {
    this.timeout = options.timeout;
  }

  public static from(options?: Options | RequestOptions): RequestOptions {
    if (options instanceof RequestOptions) {
      return options;
    }

    return new RequestOptions(options !== undefined ? options : {});
  }
}

type Options = {
  timeout?: number;
};
