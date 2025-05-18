import clsx from 'clsx';
import type { FC, HTMLAttributes, MouseEventHandler } from 'react';
import styles from './Button.module.scss';
import { CircularProgress } from '@chakra-ui/react';

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  isLoading?: boolean;
  children?: React.ReactNode;
  handleClick?: MouseEventHandler<HTMLButtonElement>;
}

const Button: FC<ButtonProps> = ({
  className,
  children,
  isLoading,
  handleClick,
  ...props
}) => {
  return (
    <button
      onClick={handleClick}
      className={clsx(styles.button, styles.black, className)}
      {...props}
    >
      {isLoading && (
        <CircularProgress
          size={5}
          marginRight={2}
          isIndeterminate
          color="blue"
        />
      )}
      {children}
    </button>
  );
};

export default Button;
