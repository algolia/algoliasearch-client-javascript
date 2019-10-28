import { RequestOptions } from '@algolia/transporter';

export class WaitablePromise<TResponse> extends Promise<TResponse> {
  // eslint-disable-next-line functional/prefer-readonly-type
  public onWaitClosure!: OnWaitClosure<TResponse>;

  public static from<TResponse>(promise: Readonly<Promise<TResponse>>): WaitablePromise<TResponse> {
    const waitable = new WaitablePromise<TResponse>(resolve => resolve(promise));

    // eslint-disable-next-line functional/immutable-data
    waitable.onWaitClosure = () => Promise.resolve();

    return waitable;
  }

  public onWait(onWaitClosure: OnWaitClosure<TResponse>): Readonly<this> {
    // eslint-disable-next-line functional/immutable-data
    this.onWaitClosure = onWaitClosure;

    return this;
  }

  public wait(requestOptions?: RequestOptions): Readonly<WaitablePromise<TResponse>> {
    const promise = this.then(response =>
      this.onWaitClosure(response, requestOptions).then(() => response)
    );

    return WaitablePromise.from<TResponse>(promise).onWait(() => Promise.resolve());
  }
}

export type OnWaitClosure<TResponse> = (
  result: TResponse,
  requestOptions?: RequestOptions
) => Readonly<Promise<any>>;
