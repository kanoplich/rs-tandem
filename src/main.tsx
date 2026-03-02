import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import '@/app/css/index.css';
import { App } from '@/app';

const rootElement = document.getElementById('root')!;
rootElement.classList.add('app');

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
