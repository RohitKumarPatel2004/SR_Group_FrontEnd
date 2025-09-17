import React from 'react';
import ReactDOM from 'react-dom/client';
import AppRoutes from './routes/AppRoutes';
import { HelmetProvider } from 'react-helmet-async';  // ✅ import provider
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>   {/* ✅ wrap your app */}
      <AppRoutes />
    </HelmetProvider>
  </React.StrictMode>
);
