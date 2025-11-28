import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Analytics } from '@vercel/analytics/react';
import { HelmetProvider } from 'react-helmet-async';
import App from './App.jsx';
import './index.css';
import { initEmailJS } from './services/emailService';

// Initialize EmailJS
initEmailJS();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
    <Analytics />
  </StrictMode>
);