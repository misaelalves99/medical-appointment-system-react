// src/app/providers/AppProviders.tsx

import type { ReactNode, ReactElement } from 'react';
import { ThemeProvider } from './ThemeProvider';

import { AuthProvider } from '../../contexts/AuthContext';
import { PatientProvider } from '../../contexts/PatientContext';
import { DoctorProvider } from '../../contexts/DoctorContext';
import { SpecialtyProvider } from '../../contexts/SpecialtyContext';
import { AppointmentProvider } from '../../contexts/AppointmentContext';

interface AppProvidersProps {
  children: ReactNode;
}

/**
 * AppProviders
 *  - Centraliza todos os Providers de contexto da aplicação.
 *  - A ordem aqui importa: Auth → domínios (Patients, Doctors, etc.).
 *  - ThemeProvider controla tema global (futuro dark/light se quiser).
 */
export function AppProviders({ children }: AppProvidersProps): ReactElement {
  return (
    <ThemeProvider>
      <AuthProvider>
        <PatientProvider>
          <DoctorProvider>
            <SpecialtyProvider>
              <AppointmentProvider>{children}</AppointmentProvider>
            </SpecialtyProvider>
          </DoctorProvider>
        </PatientProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
