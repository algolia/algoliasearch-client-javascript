export function validateRequired(field: string, method: string, value: unknown): void {
  if (value == null || (typeof value === 'string' && value.length === 0)) {
    throw new Error(`Parameter \`${field}\` is required when calling \`${method}\`.`);
  }
}
