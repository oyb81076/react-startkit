import React from 'react';

interface Props {
  value: Date | string | number;
  format?: string;
}
function DateFormat({ value, format = 'YYYY-MM-DD' }: Props): React.ReactElement | null {
  const date = value instanceof Date ? value : new Date(value);
  return <>{formatDate(date, format)}</>;
}
export default React.memo(DateFormat);

function formatDate(date: Date, fmt: string): string {
  if (typeof date.getTime() !== 'number') return 'Invalid Date';
  return fmt.replace(RE, (s) => valueOfDate[s](date));
}

const valueOfDate: Record<string, (date: Date) => string> = {
  YY: (date) => leftPad(date.getFullYear() % 100, 2),
  YYYY: (date) => leftPad(date.getFullYear(), 4),
  M: (date) => (date.getMonth() + 1).toString(), // 月份
  MM: (date) => leftPad(date.getMonth() + 1, 2), // 月份
  D: (date) => date.getDate().toString(), // 日
  DD: (date) => leftPad(date.getDate(), 2), // 日
  H: (date) => date.getHours().toString(),
  HH: (date) => leftPad(date.getHours(), 2),
  m: (date) => date.getMinutes().toString(), // 分
  mm: (date) => leftPad(date.getMinutes(), 2), // 分
  s: (date) => date.getSeconds().toString(), // 秒
  ss: (date) => leftPad(date.getSeconds(), 2), // 秒
  S: (date) => Math.floor(date.getMilliseconds() / 100).toString(),
  SS: (date) => Math.floor(date.getMilliseconds() / 10).toString(),
  SSS: (date) => date.getMilliseconds().toString(),
};
const RE = new RegExp(`(${Object.keys(valueOfDate).sort().reverse().join('|')})`, 'g');
const leftPad = (v: number, l: number) => {
  let out = v.toString();
  while (out.length < l) out = `0${out}`;
  return out;
};
