import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { Analytics } from '@vercel/analytics/react';
import App from './App.jsx';
import './index.css';
import { initEmailJS } from './services/emailService';

initEmailJS();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <App />
      {import.meta.env.VERCEL && <Analytics />}
    </HelmetProvider>
  </StrictMode>
);