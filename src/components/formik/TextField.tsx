import React from 'react';
import { ErrorMessage, Field } from 'formik';

import { ErrorHelper, FormGroup, Label } from './_styled';

export interface TextFieldProps<T> {
  label: string;
  readOnly?: boolean;
  placeholder?: string;
  name: Extract<{ [key in keyof T]: T[key] extends string ? key : never }[keyof T], string>;
}
export default function TextField<T>({
  label,
  readOnly,
  name,
  placeholder,
}: TextFieldProps<T>): React.ReactElement | null {
  return (
    <FormGroup>
      <Label>{label}:</Label>
      <Field name={name} readOnly={readOnly} placeholder={placeholder} />
      <ErrorMessage name={name} component={ErrorHelper} />
    </FormGroup>
  );
}
