import { toast } from 'react-hot-toast';
import { useCallback, useEffect, useRef, useState } from 'react';

import { ClientPosition } from '~/types';
import { getWebSocketDomain } from '~/utils';
import { Loading, Notification } from '~/components';

export const useConnect = (id: string) => {
  const toastId = useRef<string>();
  const socket = useRef<WebSocket>();
  const [isOnline, setIsOnline] = useState(false);
  const [list, setList] = useState<ClientPosition[]>([]);

  const socketMessageListener = useCallback(
    (event: MessageEvent<string>) => setList(JSON.parse(event.data)),
    []
  );

  const socketOpenListener = useCallback(() => {
    setIsOnline(true);
    toastId.current && toast.dismiss(toastId.current);
    toastId.current = undefined;
  }, []);

  const socketErrorListener = useCallback(() => {
    setIsOnline(false);
    toastId.current && toast.dismiss(toastId.current);
    toastId.current = toast.custom((t) => (
      <Notification
        type='error'
        confirmText='Retry'
        toast={t}
        onConfirm={() => {
          reconnect();
          showLoadingToast();
        }}
      >
        Failed to connect to server.
      </Notification>
    ));
  }, []);

  const showLoadingToast = useCallback(() => {
    toastId.current && toast.dismiss(toastId.current);
    toastId.current = toast.custom((t) => (
      <Notification hiddenActions toast={t}>
        <div style={{ display: 'flex' }}>
          <span style={{ flex: 9 }}>Trying to connect to server...</span>
          <Loading style={{ flex: 1 }} />
        </div>
      </Notification>
    ));
  }, []);

  const initSocket = () => {
    setIsOnline(false);
    const _socket = new WebSocket(`${getWebSocketDomain()}/${id}`);
    _socket.addEventListener('open', socketOpenListener);
    _socket.addEventListener('error', socketErrorListener);
    _socket.addEventListener('message', socketMessageListener);

    socket.current = _socket;
  };

  const destroySocket = () => {
    const _socket = socket.current;
    _socket?.removeEventListener('open', socketOpenListener);
    _socket?.removeEventListener('error', socketErrorListener);
    _socket?.removeEventListener('message', socketMessageListener);
    _socket?.close();
  };

  const reconnect = () => {
    destroySocket();
    initSocket();
  };

  useEffect(() => {
    initSocket();

    return () => {
      destroySocket();
    };
  }, []);

  const send = (position: ClientPosition) => {
    socket.current?.readyState === WebSocket.OPEN &&
      socket.current?.send(JSON.stringify(position));
  };

  return { list, isOnline, send };
};
