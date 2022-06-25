import { useRef } from 'react';

import { shallowEquals } from 'src/modules/equals';

export default function useEquals<T>(obj: T, equals?: (a: T, b: T) => boolean): T {
  const ref = useRef(obj);
  if ((equals || shallowEquals)(obj, ref.current)) {
    return ref.current;
  }
  return obj;
}
