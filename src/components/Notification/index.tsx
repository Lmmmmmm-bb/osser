import { Toast, toast } from 'react-hot-toast';
import { CSSProperties, FC, PropsWithChildren } from 'react';

import { classnames } from '~/utils';

import { Loading } from '..';
import styles from './index.module.scss';

interface NotificationProps {
  toast: Toast;
  className?: string;
  style?: CSSProperties;
  loading?: boolean;
  hiddenActions?: boolean;
  type?: 'default' | 'error';
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}

// use with Toast
const Notification: FC<PropsWithChildren<NotificationProps>> = (props) => {
  const {
    toast: t,
    children,
    style,
    loading,
    hiddenActions,
    className,
    type = 'default',
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    onConfirm,
    onCancel
  } = props;

  const handleCancel = () => {
    onCancel ? onCancel() : toast.dismiss(t.id);
  };

  return (
    <div
      style={style}
      className={classnames(
        styles.wrapper,
        type === 'error' && styles.error,
        className,
        t.visible ? 'animate-enter' : 'animate-leave'
      )}
    >
      <div className={styles.content}>{children}</div>
      {!hiddenActions && (
        <div className={styles.actions}>
          {loading ? (
            <Loading className={classnames(styles.confirm, styles.loading)} />
          ) : (
            <button className={styles.confirm} onClick={onConfirm}>
              {confirmText}
            </button>
          )}
          <button onClick={handleCancel}>{cancelText}</button>
        </div>
      )}
    </div>
  );
};

export default Notification;
