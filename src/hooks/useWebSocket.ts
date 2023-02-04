import { useEffect, useRef, useState } from 'react';

import { ClientPosition } from '~/types';
import { getWebSocketDomain } from '~/utils';

export const useWebSocket = (id: string) => {
  const socket = useRef<WebSocket>();
  const [list, setList] = useState<ClientPosition[]>([]);

  useEffect(() => {
    const _socket = new WebSocket(`${getWebSocketDomain()}/${id}`);
    _socket.addEventListener('message', (event: MessageEvent<string>) => {
      setList(JSON.parse(event.data));
    });

    socket.current = _socket;

    return () => {
      socket.current?.close();
    };
  }, []);

  const send = (position: ClientPosition) => {
    socket.current?.readyState === WebSocket.OPEN &&
      socket.current?.send(JSON.stringify(position));
  };

  return { send, list };
};
