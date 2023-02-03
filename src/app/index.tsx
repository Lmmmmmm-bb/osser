import { nanoid } from 'nanoid';
import { FC, useRef, MouseEvent, useCallback } from 'react';

import { throttle } from '~/utils';
import { Mouse } from '~/components';
import { useWebSocket } from '~/hooks';

import { Position } from '../types';
import styles from './index.module.scss';

const id = nanoid();

const App: FC = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const positionRef = useRef<Position>({ x: -9999, y: -9999 });

  const { list, send } = useWebSocket(id);

  const throttledSend = useCallback(throttle(send, 100), [send]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (wrapperRef.current) {
      const { x, y } = wrapperRef.current.getBoundingClientRect();
      const nextPosition = { id, x: e.clientX - x, y: e.clientY - y };
      // update mouse position
      positionRef.current = nextPosition;
      wrapperRef.current.style.setProperty('--x', String(nextPosition.x));
      wrapperRef.current.style.setProperty('--y', String(nextPosition.y));
      // send mouse position
      throttledSend(nextPosition);
    }
  };

  return (
    <div
      ref={wrapperRef}
      className={styles.wrapper}
      onMouseMove={handleMouseMove}
    >
      {list.map((item) => (
        <Mouse key={item.id} position={item} />
      ))}
    </div>
  );
};

export default App;
