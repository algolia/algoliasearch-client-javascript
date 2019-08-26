/* eslint @typescript-eslint/no-unused-vars: 0 */ // --> OFF
import { Cache } from './Cache';

export class NullCache implements Cache {
  public get<TValue extends object>(key: string, defaultValue: TValue): TValue {
    return defaultValue;
  }

  public set(key: string, value: object): void {}
  public delete(key: string): void {}
  public clear(): void {}
}
