export function stringSplice(
  value: string,
  position: number,
  valueToInsert: string
): string {
  return [value.slice(0, position), valueToInsert, value.slice(position)].join(
    ""
  );
}

export function stringCapitalize(value: string): string {
  return value.replace(/^\w/, c => c.toUpperCase());
}
