import { FC, useRef } from 'react';

import styles from './index.module.scss';

const App: FC = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e) => {
    if (wrapperRef.current) {
      const { x, y } = wrapperRef.current.getBoundingClientRect();
      wrapperRef.current.style.setProperty('--x', String(e.clientX - x));
      wrapperRef.current.style.setProperty('--y', String(e.clientY - y));
    }
  };

  return (
    <div
      ref={wrapperRef}
      className={styles.wrapper}
      onMouseMove={handleMouseMove}
    />
  );
};

export default App;
