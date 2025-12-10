// src/contexts/SpecialtyContext.tsx

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

import type { Specialty } from '../domain/Specialty';
import { specialtiesMock } from '../mocks/specialtiesMock';
import { generateId } from '../utils/validation';

export interface SpecialtyForm {
  id?: string | number;
  name: string;
  description?: string;
  isActive: boolean;
}

export interface SpecialtyContextValue {
  specialties: Specialty[];
  loading: boolean;
  createSpecialty: (data: SpecialtyForm) => Specialty;
  updateSpecialty: (id: string, data: SpecialtyForm) => void;
  deleteSpecialty: (id: string) => void;
  getSpecialtyById: (id: string) => Specialty | undefined;
}

const SpecialtyContext = createContext<SpecialtyContextValue | undefined>(
  undefined,
);

interface SpecialtyProviderProps {
  children: ReactNode;
}

export function SpecialtyProvider({ children }: SpecialtyProviderProps) {
  const [specialties, setSpecialties] = useState<Specialty[]>(
    () => specialtiesMock,
  );
  const [loading] = useState(false);

  const createSpecialty = (data: SpecialtyForm): Specialty => {
    const specialty: Specialty = {
      id: generateId(),
      name: data.name,
      description: data.description,
      isActive: data.isActive,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setSpecialties((prev) => [...prev, specialty]);
    return specialty;
  };

  const updateSpecialty = (id: string, data: SpecialtyForm) => {
    setSpecialties((prev) =>
      prev.map((specialty) =>
        String(specialty.id) === String(id)
          ? {
              ...specialty,
              name: data.name,
              description: data.description,
              isActive: data.isActive,
              updatedAt: new Date().toISOString(),
            }
          : specialty,
      ),
    );
  };

  const deleteSpecialty = (id: string) => {
    setSpecialties((prev) =>
      prev.filter((specialty) => String(specialty.id) !== String(id)),
    );
  };

  const getSpecialtyById = (id: string): Specialty | undefined =>
    specialties.find((specialty) => String(specialty.id) === String(id));

  const value = useMemo<SpecialtyContextValue>(
    () => ({
      specialties,
      loading,
      createSpecialty,
      updateSpecialty,
      deleteSpecialty,
      getSpecialtyById,
    }),
    [specialties, loading],
  );

  return (
    <SpecialtyContext.Provider value={value}>
      {children}
    </SpecialtyContext.Provider>
  );
}

export function useSpecialtyContext(): SpecialtyContextValue {
  const ctx = useContext(SpecialtyContext);
  if (!ctx) {
    throw new Error(
      'useSpecialtyContext must be used within a SpecialtyProvider',
    );
  }
  return ctx;
}
