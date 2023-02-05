import { toast } from 'react-hot-toast';
import { useCallback, useEffect, useRef, useState } from 'react';

import { ClientPosition } from '~/types';
import { Notification } from '~/components';
import { getWebSocketDomain } from '~/utils';

export const useWebSocket = (id: string) => {
  const socket = useRef<WebSocket>();
  const [list, setList] = useState<ClientPosition[]>([]);

  const socketMessageListener = useCallback(
    (event: MessageEvent<string>) => setList(JSON.parse(event.data)),
    []
  );

  const initSocket = () => {
    const _socket = new WebSocket(`${getWebSocketDomain()}/${id}`);
    _socket.addEventListener('error', socketErrorListener);
    _socket.addEventListener('message', socketMessageListener);

    socket.current = _socket;
  };

  const destroySocket = () => {
    const _socket = socket.current;
    _socket?.removeEventListener('error', socketErrorListener);
    _socket?.removeEventListener('message', socketMessageListener);
    _socket?.close();
  };

  const reconnect = () => {
    destroySocket();
    initSocket();
  };

  const socketErrorListener = useCallback(() => {
    toast.custom((t) => (
      <Notification
        type='error'
        className={t.visible ? 'animate-enter' : 'animate-leave'}
        confirmText='Reconnect'
        onConfirm={reconnect}
        onCancel={() => toast.dismiss(t.id)}
      >
        Failed to connect to the server.
      </Notification>
    ));
  }, []);

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

  return { list, send, reconnect };
};
