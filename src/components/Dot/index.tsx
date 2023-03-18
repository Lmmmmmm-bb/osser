import type { FC } from 'react';

import { classnames } from '~/utils';

import styles from './index.module.scss';

interface DotProps {
  online: boolean;
}

const Dot: FC<DotProps> = props => (
  <div
    className={classnames(
      styles.dot,
      props.online ? styles.online : styles.offline,
    )}
  />
);

export default Dot;
