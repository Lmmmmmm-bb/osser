import React from 'react';
import ReactDOM from 'react-dom/client';
import { inject } from '@vercel/analytics';

import './index.scss';
import App from './app';

inject();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
