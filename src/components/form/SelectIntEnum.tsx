import React from 'react';

function SelectIntEnum<T extends number>(props: {
  value: T;
  setValue: React.Dispatch<T>;
  options: Record<T, string> | Array<[T, string]>;
}): React.ReactElement;
function SelectIntEnum<T extends number>(props: {
  value: T | null;
  setValue: React.Dispatch<T | null>;
  options: Record<T, string> | Array<[T, string]>;
  optional: string;
}): React.ReactElement;
function SelectIntEnum({
  value,
  setValue,
  options,
  optional,
}: {
  value: number;
  setValue: React.Dispatch<number | null>;
  options: Record<number, string> | Array<[number, string]>;
  optional?: string;
}): React.ReactElement {
  return (
    <select
      value={value ?? ''}
      onChange={(e) => setValue(e.currentTarget.value ? Number(e.currentTarget.value) : null)}
    >
      {optional ? <option value="">{optional}</option> : null}
      {(Array.isArray(options) ? options : Object.entries(options)).map(([v, n]) => (
        <option key={v} value={v}>
          {n}
        </option>
      ))}
    </select>
  );
}
export default SelectIntEnum;
