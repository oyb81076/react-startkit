import { useRef } from 'react';

import { shallowEquals } from 'src/modules/equals';

/**
 * 返回一个 被 memo 的引用，只要 equals(prevObj, currObj); 就会返回 prevObj
 */
export default function useEquals<T>(obj: T, equals?: (a: T, b: T) => boolean): T {
  const ref = useRef(obj);
  if ((equals || shallowEquals)(obj, ref.current)) {
    return ref.current;
  }
  return obj;
}
