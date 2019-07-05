export const enum CallType {
  Read = 1,
  Write = 2,
  Any = CallType.Read | CallType.Write,
}
