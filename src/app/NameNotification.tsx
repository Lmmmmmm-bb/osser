import { FC, useState } from 'react';
import { Toast, toast } from 'react-hot-toast';

import { Input, Notification } from '~/components';
import { CLIENT_NAME } from './config';

interface NameNotificationProps {
  toast: Toast;
}

const NameNotification: FC<NameNotificationProps> = (props) => {
  const { toast: t } = props;

  const [value, setValue] = useState(localStorage.getItem(CLIENT_NAME) || '');

  const handleChange = (input: string) => {
    setValue(input);
  };

  const handleConfirm = () => {
    localStorage.setItem(CLIENT_NAME, value.trim());
    toast.dismiss(t.id);
  };

  return (
    <Notification cancelText='Close' toast={t} onConfirm={handleConfirm}>
      <Input
        placeholder='input a name you like'
        value={value}
        onChange={handleChange}
      />
    </Notification>
  );
};

export default NameNotification;
