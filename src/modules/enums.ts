type Enum<T> = { [k: string]: T | string };
const cache = new Map<object, number[]>;
export function enumValues<T extends number>(e: Enum<T>): T[] {
  let v = cache.get(e);
  if (!v) {
    v = Object.values(e).filter((x): x is T => typeof x === 'number');
    cache.set(e, v);
  }
  return v as T[];
}
export function isEnumValue<T extends number>(v: number, e: Enum<T>): v is T {
  return enumValues(e).includes(v as T);
}
