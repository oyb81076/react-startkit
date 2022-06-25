import React from 'react';

export default function useInput(
  defaultValue?: string | (() => string),
): [
  input: string,
  onChange: React.ChangeEventHandler<HTMLInputElement>,
  setValue: React.Dispatch<string>,
] {
  const [input, setInput] = React.useState(defaultValue ?? '');
  const onChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.currentTarget.value);
  }, []);
  return [input, onChange, setInput];
}
