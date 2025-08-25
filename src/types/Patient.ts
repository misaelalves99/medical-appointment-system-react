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
  history?: PatientHistoryItem[];
}

// Tipo para o contexto de pacientes
export interface PatientContextType {
  patients: Patient[];
  addPatient: (patient: Omit<Patient, "id">) => Patient;
  updatePatient: (patient: Patient) => void;
  deletePatient: (id: number) => void;
  updatePatientProfilePicture: (id: number, profilePicturePath: string) => void;
}
