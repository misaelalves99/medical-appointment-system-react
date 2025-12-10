// src/main.tsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';

// estilos globais + tema do dashboard
import './styles/globals.css';
import './styles/utilities.css';
import './theme/dashboard.css';
import './theme/forms.css';
import './theme/tables.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
