import { nanoid } from 'nanoid';
import { FC, useRef, MouseEvent, useCallback } from 'react';

import { throttle } from '~/utils';
import { Mouse } from '~/components';
import { useWebSocket } from '~/hooks';

import { Position } from '../types';
import styles from './index.module.scss';
import { defaultPosition } from './config';

const id = nanoid();

const App: FC = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const positionRef = useRef<Position>(defaultPosition);

  const { list, send } = useWebSocket(id);

  const throttledSend = useCallback(throttle(send, 50), [send]);

  const handleMouseMove = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
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
    },
    [throttledSend]
  );

  const handleMouseOut = useCallback(() => {
    throttledSend({ id, ...defaultPosition });
  }, [throttledSend]);

  return (
    <div
      ref={wrapperRef}
      className={styles.wrapper}
      onMouseMove={handleMouseMove}
      onMouseOut={handleMouseOut}
    >
      {list
        .filter((item) => item.id !== id)
        .map((item) => (
          <Mouse key={item.id} position={item} />
        ))}
    </div>
  );
};

export default App;
