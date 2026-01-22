export function genericFilter(data: any, filter: string): boolean {
  const term = filter.trim().toLowerCase();

  return (
    data &&
    Object.values(data).some(
      (value) =>
        value !== null &&
        value !== undefined &&
        (typeof value === 'object'
          ? genericFilter(value, filter)
          : String(value).trim().toLowerCase().includes(term)),
    )
  );
}
