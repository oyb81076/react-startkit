import React from 'react';

interface Props {
  // 钱数据库存储的单位是分
  decimal?: boolean;
  value: number;
}
function NumberFormat({ decimal, value }: Props): React.ReactElement | null {
  if (decimal) {
    const val = value / 100;
    const high = fmtNumber(val);
    const low = val.toFixed(2).split('.')[1];
    return (
      <>
        {high}.{low}
      </>
    );
  }
  return <>{fmtNumber(value)}</>;
}
export default React.memo(NumberFormat);

function fmtNumber(a: number) {
  const f = a.toFixed(0);
  if (f.length <= 3) return f;
  let k = f.length % 3;
  let s = f.substring(0, k);
  for (; k < f.length; k += 3) {
    if (k) s += ',';
    s += f.substring(k, k + 3);
  }
  return s;
}
