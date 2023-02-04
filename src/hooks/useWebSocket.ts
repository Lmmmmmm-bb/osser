import { toast } from 'react-hot-toast';
import { useEffect, useRef, useState } from 'react';

import { ClientPosition } from '~/types';
import { getWebSocketDomain } from '~/utils';

export const useWebSocket = (id: string) => {
  const socket = useRef<WebSocket>();
  const [list, setList] = useState<ClientPosition[]>([]);

  useEffect(() => {
    const socketErrorListener = () => {
      toast.error(
        'Failed to connect to the server.\nPlease refresh to retry.',
        {
          duration: 5000
        }
      );
    };

    const socketMessageListener = (event: MessageEvent<string>) =>
      setList(JSON.parse(event.data));

    const _socket = new WebSocket(`${getWebSocketDomain()}/${id}`);
    _socket.addEventListener('error', socketErrorListener);
    _socket.addEventListener('message', socketMessageListener);

    socket.current = _socket;

    return () => {
      _socket.removeEventListener('error', socketErrorListener);
      _socket.removeEventListener('message', socketMessageListener);
      _socket.close();
    };
  }, []);

  const send = (position: ClientPosition) => {
    socket.current?.readyState === WebSocket.OPEN &&
      socket.current?.send(JSON.stringify(position));
  };

  return { send, list };
};
