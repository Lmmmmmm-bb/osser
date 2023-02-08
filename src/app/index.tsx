import {
  FC,
  useRef,
  MouseEvent,
  useCallback,
  useEffect,
  useState,
  TouchEvent
} from 'react';
import { nanoid } from 'nanoid';
import { toast, Toaster } from 'react-hot-toast';

import { useWebSocket } from '~/hooks';
import { Dot, Mouse } from '~/components';
import { delay, throttle } from '~/utils';

import { Position } from '../types';
import styles from './index.module.scss';
import InputNotification from './InputNotification';
import { CLIENT_NAME, defaultPosition, toastOptions } from './config';

const id = nanoid();

const App: FC = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const positionRef = useRef<Position>(defaultPosition);
  const [name, setName] = useState(() => {
    const _name = localStorage.getItem(CLIENT_NAME) || '';
    const limit = _name.slice(0, 20);
    // limit name length and update to localStorage
    localStorage.setItem(CLIENT_NAME, limit);
    return limit;
  });

  const { list, isOnline, send } = useWebSocket(id);

  const throttledSend = useCallback(throttle(send, 50), [send]);

  const update = (position: Position) => {
    if (wrapperRef.current) {
      const { x, y } = wrapperRef.current.getBoundingClientRect();
      // update mouse position
      positionRef.current = { x: position.x - x, y: position.y - y };
      wrapperRef.current.style.setProperty('--x', String(position.x));
      wrapperRef.current.style.setProperty('--y', String(position.y));
      // send mouse position
      throttledSend({ id, name, ...position });
    }
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (wrapperRef.current) {
      update({ x: e.clientX, y: e.clientY });
    }
  };

  const handleLeave = () => {
    delay(() => {
      update(defaultPosition);
      send({ id, name, ...defaultPosition });
    }, 100);
  };

  const handleNameConfirm = (value: string) => {
    localStorage.setItem(CLIENT_NAME, value);
    setName(value);
  };

  useEffect(() => {
    let toastId: string;
    if (!localStorage.getItem(CLIENT_NAME)) {
      toastId = toast.custom(
        (t) => <InputNotification toast={t} onConfirm={handleNameConfirm} />,
        {
          duration: Infinity
        }
      );
    }

    return () => {
      toastId && toast.dismiss(toastId);
    };
  }, []);

  const handleTouch = (e: TouchEvent<HTMLDivElement>) => {
    if (wrapperRef.current) {
      const { clientX, clientY } = e.touches[0];
      update({ x: clientX, y: clientY });
    }
  };

  return (
    <>
      <div
        ref={wrapperRef}
        className={styles.wrapper}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleLeave}
        onTouchEnd={handleLeave}
        onTouchStart={handleTouch}
        onTouchMove={handleTouch}
      >
        <p className={styles.label}>
          {name && <span className={styles.name}>{name}</span>}
          <Dot online={isOnline} />
          {list.length !== 0 && (
            <span className={styles.online}>{list.length} online</span>
          )}
        </p>
        {list
          .filter((item) => item.id !== id)
          .map((item) => (
            <Mouse key={item.id} position={item} />
          ))}
      </div>
      <Toaster toastOptions={toastOptions} />
    </>
  );
};

export default App;
