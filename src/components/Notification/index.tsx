import { CSSProperties, FC, PropsWithChildren } from 'react';
import { classnames } from '~/utils';

import styles from './index.module.scss';

interface NotificationProps {
  className?: string;
  style?: CSSProperties;
  type?: 'default' | 'error';
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}

const Notification: FC<PropsWithChildren<NotificationProps>> = (props) => {
  const {
    children,
    style,
    className,
    type = 'default',
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    onConfirm,
    onCancel
  } = props;

  return (
    <div
      style={style}
      className={classnames(
        styles.wrapper,
        type === 'error' && styles.error,
        className
      )}
    >
      <div className={styles.content}>{children}</div>
      <div className={styles.actions}>
        <button className={styles.confirm} onClick={onConfirm}>
          {confirmText}
        </button>
        <button onClick={onCancel}>{cancelText}</button>
      </div>
    </div>
  );
};

export default Notification;
