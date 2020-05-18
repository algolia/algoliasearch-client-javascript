import { WaitablePromise } from '..';

export function waitResponses(responses: Array<Readonly<WaitablePromise<any>>>) {
  return Promise.all(responses.map(response => response.wait()));
}

export type KeysOfType<TType, TRequiredType> = {
  [TKey in keyof TType]: TType[TKey] extends TRequiredType ? TKey : never;
}[keyof TType];
export type RequiredKeys<TType> = Exclude<
  KeysOfType<TType, Exclude<TType[keyof TType], undefined>>,
  undefined
>;
