export class RequestOptions {
  public headers?: { [key: string]: string };
  public timeout?: number;

  public constructor(options: Options) {
    this.headers = options.headers;
    this.timeout = options.timeout;
  }

  public static from(options?: Options | RequestOptions) {
    if (options instanceof RequestOptions) {
      return options;
    }

    return new RequestOptions(options !== undefined ? options : {});
  }
}

type Options = {
  timeout?: number;
  headers?: { [key: string]: string };
};
