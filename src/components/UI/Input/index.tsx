import type { ChangeEvent, FC, HTMLAttributes } from 'react';
import InputEmail from './Email/Input';
import InputPassword from './Password/Input';

export interface InputProps extends HTMLAttributes<HTMLInputElement> {
  type?: 'text' | 'password' | 'email' | 'search' | 'date' | 'time';
  label?: string;
  error?: string;
  name?: string;
  placeholder?: string;
  readOnly?: boolean;
  value?: string;
  handleChange?: (e: ChangeEvent<HTMLInputElement>) => any;
  handleBlur?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Input: FC<InputProps> = ({ type, ...props }) => {
  switch (type) {
    case 'email':
      return <InputEmail {...props} />;
    case 'password':
      return <InputPassword {...props} />;
    default:
      return <InputEmail {...props} />;
  }
};

export default Input;
