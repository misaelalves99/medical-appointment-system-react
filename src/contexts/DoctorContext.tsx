// src/contexts/DoctorContext.tsx

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

import type { Doctor } from '../domain/Doctor';
import type { DoctorAvailability } from '../domain/DoctorAvailability';
import { doctorsMock } from '../mocks/doctorsMock';
import { generateId } from '../utils/validation';

export interface DoctorForm {
  name: string;
  crm: string;
  specialtyId: string;
  phone?: string;
  email?: string;
  avatarUrl?: string;
  bio?: string;
  isActive?: boolean;
}

export interface DoctorContextValue {
  doctors: Doctor[];
  loading: boolean;
  /** alias para compatibilidade com hooks antigos */
  isLoading: boolean;

  /** cria um médico novo e devolve o objeto */
  createDoctor: (data: DoctorForm) => Doctor;
  /** alias para compatibilidade com telas que usam addDoctor */
  addDoctor: (data: DoctorForm) => Doctor;

  updateDoctor: (id: string, data: DoctorForm) => void;
  deleteDoctor: (id: string) => void;

  getDoctorById: (id: string) => Doctor | undefined;

  /** devolve a disponibilidade do médico ou [] */
  getDoctorAvailability: (id: string) => DoctorAvailability[];

  /** seta a disponibilidade do médico */
  setAvailability: (id: string, availability: DoctorAvailability[]) => void;
}

const DoctorContext = createContext<DoctorContextValue | undefined>(undefined);

interface DoctorProviderProps {
  children: ReactNode;
}

export function DoctorProvider({ children }: DoctorProviderProps) {
  const [doctors, setDoctors] = useState<Doctor[]>(() => doctorsMock);
  const [loading] = useState(false);

  const createDoctor = (data: DoctorForm): Doctor => {
    const now = new Date().toISOString();

    const doctor: Doctor = {
      id: generateId(),
      name: data.name,
      crm: data.crm,
      specialtyId: data.specialtyId,
      phone: data.phone,
      email: data.email,
      avatarUrl: data.avatarUrl,
      bio: data.bio,
      isActive: data.isActive ?? true,
      availability: [],
      createdAt: now,
      updatedAt: now,
    };

    setDoctors((prev) => [...prev, doctor]);
    return doctor;
  };

  const updateDoctor = (id: string, data: DoctorForm) => {
    const now = new Date().toISOString();

    setDoctors((prev) =>
      prev.map((doctor) =>
        String(doctor.id) === String(id)
          ? {
              ...doctor,
              name: data.name,
              crm: data.crm,
              specialtyId: data.specialtyId,
              phone: data.phone,
              email: data.email,
              avatarUrl: data.avatarUrl,
              bio: data.bio ?? doctor.bio,
              isActive: data.isActive ?? doctor.isActive ?? true,
              updatedAt: now,
            }
          : doctor,
      ),
    );
  };

  const deleteDoctor = (id: string) => {
    setDoctors((prev) =>
      prev.filter((doctor) => String(doctor.id) !== String(id)),
    );
  };

  const getDoctorById = (id: string): Doctor | undefined =>
    doctors.find((doctor) => String(doctor.id) === String(id));

  const getDoctorAvailability = (id: string): DoctorAvailability[] => {
    const doctor = getDoctorById(id);
    return doctor?.availability ?? [];
  };

  const setAvailability = (id: string, availability: DoctorAvailability[]) => {
    const now = new Date().toISOString();

    setDoctors((prev) =>
      prev.map((doctor) =>
        String(doctor.id) === String(id)
          ? {
              ...doctor,
              availability,
              updatedAt: now,
            }
          : doctor,
      ),
    );
  };

  const value = useMemo<DoctorContextValue>(
    () => ({
      doctors,
      loading,
      isLoading: loading,
      createDoctor,
      addDoctor: createDoctor,
      updateDoctor,
      deleteDoctor,
      getDoctorById,
      getDoctorAvailability,
      setAvailability,
    }),
    [doctors, loading],
  );

  return (
    <DoctorContext.Provider value={value}>{children}</DoctorContext.Provider>
  );
}

export function useDoctorContext(): DoctorContextValue {
  const ctx = useContext(DoctorContext);
  if (!ctx) {
    throw new Error('useDoctorContext must be used within a DoctorProvider');
  }
  return ctx;
}
