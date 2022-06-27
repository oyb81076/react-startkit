import { Form } from './_styled';
import TextField, { TextFieldProps } from './TextField';

const components = {
  Form,
  TextField,
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function formik<T>(_: T): {
  Form: typeof Form;
  TextField: React.FC<TextFieldProps<T>>;
} {
  return components;
}
