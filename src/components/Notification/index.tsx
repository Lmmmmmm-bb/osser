import { FC, PropsWithChildren } from 'react';
import { classnames } from '~/utils';

import styles from './index.module.scss';

interface NotificationProps {
  type?: 'default' | 'error';
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}

const Notification: FC<PropsWithChildren<NotificationProps>> = (props) => {
  const {
    children,
    type = 'default',
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    onConfirm,
    onCancel
  } = props;

  return (
    <div
      className={classnames(styles.wrapper, type === 'error' && styles.error)}
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
