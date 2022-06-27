import React from 'react';
import { Field } from 'formik';

interface Props {
  name: string;
  options: Record<number, string> | Array<[number, string]>;
  optional?: string;
}
export default function SelectEnum({ name, options, optional }: Props): React.ReactElement | null {
  return (
    <Field as="select" name={name}>
      {optional ? <option value="">{optional}</option> : null}
      {(Array.isArray(options) ? options : Object.entries(options)).map(([v, n]) => (
        <option key={v} value={v}>
          {n}
        </option>
      ))}
    </Field>
  );
}
