import { useId, useState, type FC } from 'react';
import styles from './Input.module.scss';
import clsx from 'clsx';
import type { InputProps } from '..';

const InputEmail: FC<InputProps> = ({
  label,
  error,
  name,
  value,
  handleChange,
  handleBlur,
  className,
  ...props
}) => {
  const id = useId();
  const [inputValue, setInputValue] = useState(value);

  return (
    <div className={clsx(styles.wrapper, className)}>
      <div className={styles.content}>
        <input
          type="email"
          id={id}
          placeholder=""
          autoCorrect=""
          autoComplete=""
          spellCheck={false}
          onBlur={handleBlur}
          onChange={e => {
            setInputValue(e.target.value);
            handleChange && handleChange(e);
          }}
          value={inputValue}
          name={name}
          className={clsx(styles.input, {
            [`${styles.inputError}`]: error,
          })}
          {...props}
        />
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
      </div>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default InputEmail;
