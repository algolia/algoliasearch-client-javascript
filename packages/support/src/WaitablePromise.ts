export class WaitablePromise<TResponse> extends Promise<TResponse> {
  // eslint-disable-next-line functional/prefer-readonly-type
  public onWaitClosure!: OnWaitClosure<TResponse>;

  public static from<TResponse>(promise: Promise<TResponse>): WaitablePromise<TResponse> {
    return new WaitablePromise<TResponse>(resolve => resolve(promise));
  }

  public onWait(onWaitClosure: OnWaitClosure<TResponse>): Readonly<this> {
    // eslint-disable-next-line functional/immutable-data
    this.onWaitClosure = onWaitClosure;

    return this;
  }

  public wait(): Readonly<WaitablePromise<TResponse>> {
    const promise = this.then(response => this.onWaitClosure(response).then(() => response));

    return WaitablePromise.from<TResponse>(promise).onWait(() => Promise.resolve());
  }
}

export type OnWaitClosure<TResponse> = (result: TResponse) => Promise<any>;
