import type { CSSProperties, FC, HTMLProps } from 'react';

import { classnames } from '~/utils';

import styles from './index.module.scss';

interface InputProps extends Omit<HTMLProps<HTMLInputElement>, 'onChange'> {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  style?: CSSProperties;
  placeholder?: string;
}

const Input: FC<InputProps> = (props) => {
  const { value, onChange, className, ...rest } = props;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <input
      className={classnames(styles.input, className)}
      value={value}
      onChange={handleChange}
      {...rest}
    />
  );
};

export default Input;
