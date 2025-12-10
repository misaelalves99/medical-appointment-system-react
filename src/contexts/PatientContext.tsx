// src/contexts/PatientContext.tsx

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

import type { Patient } from '../domain/Patient';
import type { PatientForm } from '../domain/PatientForm';
import type { PatientHistoryItem } from '../domain/PatientHistory';
import { patientsMock } from '../mocks/patientsMock';
import { generateId } from '../utils/validation';

export interface PatientContextValue {
  patients: Patient[];
  loading: boolean;
  createPatient: (data: PatientForm) => Patient;
  updatePatient: (id: string, data: PatientForm) => void;
  deletePatient: (id: string) => void;
  getPatientById: (id: string) => Patient | undefined;
  addHistoryItem: (patientId: string, entry: PatientHistoryItem) => void;
  getPatientHistory: (patientId: string) => PatientHistoryItem[];
  updatePatientAvatar: (id: string, file: File) => Promise<void>;
}

const PatientContext = createContext<PatientContextValue | undefined>(
  undefined,
);

interface PatientProviderProps {
  children: ReactNode;
}

export function PatientProvider({ children }: PatientProviderProps) {
  const [patients, setPatients] = useState<Patient[]>(() => patientsMock);
  const [loading] = useState(false);

  const createPatient = (data: PatientForm): Patient => {
    const newPatient: Patient = {
      id: generateId(),
      ...data,
      isActive: data.isActive ?? true,
      notes: data.notes ?? '',
      history: data.history ?? [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setPatients((prev) => [...prev, newPatient]);
    return newPatient;
  };

  const updatePatient = (id: string, data: PatientForm) => {
    setPatients((prev) =>
      prev.map((patient) =>
        String(patient.id) === String(id)
          ? {
              ...patient,
              ...data,
              isActive: data.isActive ?? patient.isActive,
              updatedAt: new Date().toISOString(),
            }
          : patient,
      ),
    );
  };

  const deletePatient = (id: string) => {
    setPatients((prev) => prev.filter((p) => String(p.id) !== String(id)));
  };

  const getPatientById = (id: string): Patient | undefined =>
    patients.find((p) => String(p.id) === String(id));

  const addHistoryItem = (patientId: string, entry: PatientHistoryItem) => {
    setPatients((prev) =>
      prev.map((patient) =>
        String(patient.id) === String(patientId)
          ? {
              ...patient,
              history: [...(patient.history ?? []), entry],
              updatedAt: new Date().toISOString(),
            }
          : patient,
      ),
    );
  };

  const getPatientHistory = (patientId: string): PatientHistoryItem[] => {
    const found = patients.find(
      (patient) => String(patient.id) === String(patientId),
    );
    return found?.history ?? [];
  };

  const updatePatientAvatar = async (id: string, file: File) => {
    const objectUrl = URL.createObjectURL(file);

    setPatients((prev) =>
      prev.map((patient) =>
        String(patient.id) === String(id)
          ? {
              ...patient,
              avatarUrl: objectUrl,
              updatedAt: new Date().toISOString(),
            }
          : patient,
      ),
    );
  };

  const value = useMemo<PatientContextValue>(
    () => ({
      patients,
      loading,
      createPatient,
      updatePatient,
      deletePatient,
      getPatientById,
      addHistoryItem,
      getPatientHistory,
      updatePatientAvatar,
    }),
    [patients, loading],
  );

  return (
    <PatientContext.Provider value={value}>
      {children}
    </PatientContext.Provider>
  );
}

export function usePatientContext(): PatientContextValue {
  const ctx = useContext(PatientContext);
  if (!ctx) {
    throw new Error('usePatientContext must be used within a PatientProvider');
  }
  return ctx;
}
