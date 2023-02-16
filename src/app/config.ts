import { ToastOptions } from 'react-hot-toast';

import { Position } from '~/types';

export const defaultPosition: Position = {
  x: -9999,
  y: -9999
};

export const toastOptions: ToastOptions = {
  duration: 5000,
  position: 'top-right'
};

export const CLIENT_NAME = 'CLIENT_NAME';
