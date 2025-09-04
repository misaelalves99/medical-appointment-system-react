// src/contexts/PatientProvider.tsx
import React, { useState } from "react";
import { PatientContext } from "./PatientContext";
import type { Patient } from "../types/Patient";
import { patientsMock } from "../mocks/patients";

interface Props {
  children: React.ReactNode;
}

export const PatientProvider: React.FC<Props> = ({ children }) => {
  const [patients, setPatients] = useState<Patient[]>(patientsMock);

  // Agora aceita Omit<Patient, "id"> e gera id automaticamente
  const addPatient = (patient: Omit<Patient, "id">) => {
    const newPatient: Patient = {
      id: patients.length ? Math.max(...patients.map((p) => p.id)) + 1 : 1,
      ...patient,
    };
    setPatients((prev) => [...prev, newPatient]);
    return newPatient;
  };

  const updatePatient = (updated: Patient) => {
    setPatients((prev) =>
      prev.map((p) => (p.id === updated.id ? { ...updated } : p))
    );
  };

  const deletePatient = (id: number) => {
    setPatients((prev) => prev.filter((p) => p.id !== id));
  };

  const updatePatientProfilePicture = (id: number, path: string) => {
    setPatients((prev) =>
      prev.map((p) => (p.id === id ? { ...p, profilePicturePath: path } : p))
    );
  };

  return (
    <PatientContext.Provider
      value={{
        patients,
        addPatient,
        updatePatient,
        deletePatient,
        updatePatientProfilePicture,
      }}
    >
      {children}
    </PatientContext.Provider>
  );
};
