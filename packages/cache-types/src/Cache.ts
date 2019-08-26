export type Cache = {
  readonly get: <TValue extends object>(key: string, defaultValue: TValue) => TValue;
  readonly set: (key: string, value: object) => void;
  readonly delete: (key: string) => void;
  readonly clear: () => void;
};
