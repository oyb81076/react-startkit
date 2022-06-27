import styled from '@emotion/styled';
import { Form as FormikForm } from 'formik';

export const FormGroup = styled.div`
  margin-bottom: 15px;
`;
export const Label = styled.label``;
export const ErrorHelper = styled.div`
  color: red;
`;
export const Form = styled(FormikForm)`
  ${Label} {
    min-width: 100px;
    text-align: right;
  }
  ${FormGroup} {
    display: flex;
  }
`;
