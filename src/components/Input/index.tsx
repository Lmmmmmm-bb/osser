import clsx from 'clsx';
import { FC, CSSProperties } from 'react';

import styles from './index.module.scss';

interface InputProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  style?: CSSProperties;
}

const Input: FC<InputProps> = (props) => {
  const { value, onChange, className, ...rest } = props;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <input
      className={clsx(styles.input, className)}
      value={value}
      onChange={handleChange}
      {...rest}
    />
  );
};

export default Input;
