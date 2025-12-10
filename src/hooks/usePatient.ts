// src/hooks/usePatient.ts

import { usePatientContext } from '../contexts/PatientContext';

export function usePatient() {
  const ctx = usePatientContext();

  return {
    ...ctx,
    addPatient: ctx.createPatient,
    isLoading: ctx.loading,
    updatePatientAvatar: ctx.updatePatientAvatar,
  };
}
