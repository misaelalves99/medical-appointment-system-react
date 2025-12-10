// src/hooks/useSpecialty.ts

import { useSpecialtyContext } from '../contexts/SpecialtyContext';

export function useSpecialty() {
  const ctx = useSpecialtyContext();

  return {
    ...ctx,
    isLoading: ctx.loading,
    addSpecialty: ctx.createSpecialty,
  };
}
