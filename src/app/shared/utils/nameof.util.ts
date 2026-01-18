export const nameof = <T extends object>(action: (_: T) => any): keyof T =>
  action(new Proxy({} as T, { get: (_, p) => p as keyof T }));
