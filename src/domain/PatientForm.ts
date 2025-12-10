// src/domain/PatientForm.ts

import type { Gender } from './common';
import type { PatientHistoryItem } from './PatientHistory';

export interface PatientForm {
  name: string;
  cpf: string;
  email: string;
  phone: string;
  birthDate: string; // ISO
  gender: Gender;
  address: string;
  notes?: string;
  avatarUrl?: string;
  isActive: boolean;
  history?: PatientHistoryItem[];
}
