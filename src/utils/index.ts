export function stringSplice(
  value: string,
  position: number,
  valueToInsert: string
): string {
  return [value.slice(0, position), valueToInsert, value.slice(position)].join(
    ""
  );
}
