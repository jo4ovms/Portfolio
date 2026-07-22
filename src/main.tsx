import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './app.css';
import type { Lang } from './content';

const lang: Lang = document.documentElement.lang.startsWith('pt') ? 'pt' : 'en';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App lang={lang} />
  </StrictMode>,
);
