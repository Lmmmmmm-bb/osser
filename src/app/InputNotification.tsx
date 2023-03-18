import type { FC } from 'react';
import { useState } from 'react';
import type { Toast } from 'react-hot-toast';
import { toast } from 'react-hot-toast';

import { Input, Notification } from '~/components';

import { CLIENT_NAME } from './config';

interface InputNotificationProps {
  toast: Toast;
  onConfirm?: (value: string) => void;
}

const InputNotification: FC<InputNotificationProps> = (props) => {
  const { toast: t, onConfirm } = props;

  const [value, setValue] = useState(localStorage.getItem(CLIENT_NAME) || '');

  const handleChange = (input: string) => {
    setValue(input);
  };

  const handleConfirm = () => {
    const _value = value.trim();
    onConfirm?.(_value);
    toast.dismiss(t.id);
  };

  return (
    <Notification cancelText="Close" toast={t} onConfirm={handleConfirm}>
      <Input
        placeholder="input a name you like"
        value={value}
        onChange={handleChange}
        onKeyDown={e => e.key === 'Enter' && handleConfirm()}
      />
    </Notification>
  );
};

export default InputNotification;
