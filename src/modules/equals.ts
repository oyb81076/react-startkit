// eslint-disable-next-line @typescript-eslint/unbound-method
const { hasOwnProperty, toString } = Object.prototype;

export function strictEquals(a: unknown, b: unknown): boolean {
  return a === b;
}

export function shallowEquals(a: unknown, b: unknown): boolean {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (toString.call(a) !== toString.call(b)) return false;
  if (typeof a !== 'object') return false;
  if (a instanceof Date) return b instanceof Date && a.getTime() === b.getTime();
  if (Array.isArray(a)) {
    return shallowEqualsArray(a, b as typeof a);
  }
  return shallowEqualsObject(a as never, b as never);
}

// 这里存在着么个问题 shallowEqualsObject({ a: undefined, b: 1 }, {})
function shallowEqualsObject(a: Record<string, unknown>, b: Record<string, unknown>): boolean {
  const keyA = Object.keys(a);
  let strictKeys = 0;
  const compareA = keyA.every((k) => {
    const va = a[k];
    if (va !== undefined) {
      strictKeys++;
      return hasOwnProperty.call(b, k) && b[k] === va;
    }
    if (hasOwnProperty.call(b, k)) {
      return b[k] === undefined;
    }
    return true;
  });
  if (!compareA) return false;
  const bKeys = Object.keys(b).reduce((p, k) => (b[k] !== undefined ? p + 1 : p), 0);
  return strictKeys === bKeys;
}
function shallowEqualsArray<T>(a: T[], b: T[]) {
  if (a.length !== b.length) return false;
  return a.every((v, i) => v === b[i]);
}
