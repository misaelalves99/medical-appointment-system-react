// src/contexts/PatientContext.tsx
import { createContext } from "react";
import type { Patient } from "../types/Patient";

export interface PatientContextType {
  patients: Patient[];
  addPatient: (patient: Omit<Patient, "id">) => Patient; // agora Omit<Patient, "id">
  updatePatient: (patient: Patient) => void;
  deletePatient: (id: number) => void;
  updatePatientProfilePicture: (id: number, path: string) => void;
}

export const PatientContext = createContext<PatientContextType | undefined>(
  undefined
);
