export type Cache = {
  readonly get: <TValue>(key: string, defaultValue: TValue) => TValue;
  readonly set: (key: string, value: any) => void;
  readonly delete: (key: string) => void;
  readonly clear: () => void;
};
