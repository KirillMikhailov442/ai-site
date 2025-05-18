import { useId, useState, type FC } from 'react';
import styles from './Input.module.scss';
import clsx from 'clsx';
import type { InputProps } from '..';
import { Eye, EyeOff } from 'lucide-react';

const InputPassword: FC<InputProps> = ({
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
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={clsx(styles.wrapper, className)}>
      <div className={styles.content}>
        <input
          type={!showPassword ? 'password' : 'text'}
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
        <span
          onClick={() => setShowPassword(prev => !prev)}
          className={styles.eye}
        >
          {!showPassword ? <Eye strokeWidth={1} /> : <EyeOff strokeWidth={1} />}
        </span>
      </div>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default InputPassword;
