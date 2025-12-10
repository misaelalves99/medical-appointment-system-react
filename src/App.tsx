// src/App.tsx

import type { ReactElement } from 'react';
import { AppProviders } from './app/providers/AppProviders';
import { AppRouter } from './app/router/AppRouter';

/**
 * Componente raiz da aplicação.
 * - Envolve tudo com AppProviders (Auth, Pacientes, Médicos, etc.)
 * - Renderiza o AppRouter, que decide qual layout usar (Auth / Dashboard).
 */
export function App(): ReactElement {
  return (
    <AppProviders>
      <AppRouter />
    </AppProviders>
  );
}
