import { FC } from 'react';

import { ClientPosition } from '~/types';

import styles from './index.module.scss';

interface MouseProps {
  position: ClientPosition;
}

const Mouse: FC<MouseProps> = (props) => {
  const { position } = props;

  return (
    <div
      id={position.id}
      className={styles.wrapper}
      style={{ left: position.x, top: position.y }}
    />
  );
};

export default Mouse;
