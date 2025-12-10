// src/hooks/useDoctor.ts

import { useDoctorContext } from '../contexts/DoctorContext';

export function useDoctor() {
  return useDoctorContext();
}
