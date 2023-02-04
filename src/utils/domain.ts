export const getWebSocketDomain = () => {
  const protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  const osserDomain = import.meta.env.OSSER_DOMAIN;
  return `${protocol}://${osserDomain}`;
};
