// src/types/Patient.ts

import type { PatientHistoryItem } from "./PatientHistory";

export interface Patient {
  id: number;
  name: string;
  cpf: string;
  dateOfBirth: string;
  email: string;
  phone: string;
  address: string;
  gender?: string;
  fullName?: string;
  profilePicturePath?: string;
  history?: PatientHistoryItem[]; // Adicionado para histórico
}
