export class WaitablePromise<TResponse> extends Promise<TResponse> {
  public waitClosure!: waitClosure;

  public wait(): Promise<TResponse> {
    return new Promise(resolve => {
      this.then((result: TResponse) => {
        this.waitClosure(result).then(() => {
          resolve(result);
        });
      });
    });
  }
}

export type waitClosure = (result: any) => Promise<void>;
