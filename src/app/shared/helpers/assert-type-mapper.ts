export function assertTypeMapper<T>(object: unknown = undefined): T {
  return object as T;
}
