export function nameof<T extends object>(action: (_: T) => any): keyof T {
  return action(new Proxy({} as T, { get: (_, p) => p as keyof T }));
}
