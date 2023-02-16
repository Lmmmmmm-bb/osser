import { FC, CSSProperties } from 'react';

import { classnames } from '~/utils';

import styles from './index.module.scss';

interface LoadingProps {
  className?: string;
  style?: CSSProperties;
}

const Loading: FC<LoadingProps> = (props) => {
  const { className, style } = props;

  return (
    <div style={style} className={classnames(styles.wrapper, className)}>
      <span className={styles.loading}>
        <i />
        <i />
        <i />
      </span>
    </div>
  );
};

export default Loading;
