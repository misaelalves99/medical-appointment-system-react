// src/contexts/AppointmentContext.tsx

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

import type { Appointment, AppointmentStatus } from '../domain/Appointment';
import { appointmentsMock } from '../mocks/appointmentsMock';
import { generateId } from '../utils/validation';

export interface AppointmentFormData {
  patientId: string;
  doctorId: string;
  specialtyId?: string;
  dateTime: string; // ISO
  status?: AppointmentStatus;
  notes?: string;
}

export interface AppointmentContextValue {
  appointments: Appointment[];
  loading: boolean;
  createAppointment: (data: AppointmentFormData) => Appointment;
  updateAppointment: (id: string, data: Partial<AppointmentFormData>) => void;
  deleteAppointment: (id: string) => void;
  getAppointmentById: (id: string) => Appointment | undefined;
  setStatus: (id: string, status: AppointmentStatus) => void;
  confirmAppointment: (id: string) => void;
  cancelAppointment: (id: string, reason?: string) => void;
}

const AppointmentContext = createContext<AppointmentContextValue | undefined>(
  undefined,
);

interface AppointmentProviderProps {
  children: ReactNode;
}

export function AppointmentProvider({ children }: AppointmentProviderProps) {
  const [appointments, setAppointments] = useState<Appointment[]>(
    () => appointmentsMock,
  );
  const [loading] = useState(false);

  const createAppointment = (data: AppointmentFormData): Appointment => {
    const nowIso = new Date().toISOString();

    const appointment: Appointment = {
      id: generateId(),
      patientId: data.patientId,
      doctorId: data.doctorId,
      specialtyId: data.specialtyId || undefined,
      dateTime: data.dateTime,
      status: data.status ?? 'SCHEDULED',
      notes: data.notes?.trim() || '',
      createdAt: nowIso,
      updatedAt: nowIso,
    };

    setAppointments((prev) => [...prev, appointment]);
    return appointment;
  };

  const updateAppointment = (
    id: string,
    data: Partial<AppointmentFormData>,
  ) => {
    setAppointments((prev) =>
      prev.map((appointment) =>
        String(appointment.id) === String(id)
          ? {
              ...appointment,
              ...data,
              updatedAt: new Date().toISOString(),
            }
          : appointment,
      ),
    );
  };

  const deleteAppointment = (id: string) => {
    setAppointments((prev) =>
      prev.filter((appointment) => String(appointment.id) !== String(id)),
    );
  };

  const getAppointmentById = (id: string): Appointment | undefined =>
    appointments.find((appointment) => String(appointment.id) === String(id));

  const setStatus = (id: string, status: AppointmentStatus) => {
    setAppointments((prev) =>
      prev.map((appointment) =>
        String(appointment.id) === String(id)
          ? {
              ...appointment,
              status,
              updatedAt: new Date().toISOString(),
            }
          : appointment,
      ),
    );
  };

  const confirmAppointment = (id: string) => {
    setStatus(id, 'CONFIRMED');
  };

  const cancelAppointment = (id: string, reason?: string) => {
    setAppointments((prev) =>
      prev.map((appointment) =>
        String(appointment.id) === String(id)
          ? {
              ...appointment,
              status: 'CANCELLED',
              notes: reason ?? appointment.notes,
              updatedAt: new Date().toISOString(),
            }
          : appointment,
      ),
    );
  };

  const value = useMemo<AppointmentContextValue>(
    () => ({
      appointments,
      loading,
      createAppointment,
      updateAppointment,
      deleteAppointment,
      getAppointmentById,
      setStatus,
      confirmAppointment,
      cancelAppointment,
    }),
    [appointments, loading],
  );

  return (
    <AppointmentContext.Provider value={value}>
      {children}
    </AppointmentContext.Provider>
  );
}

export function useAppointmentContext(): AppointmentContextValue {
  const ctx = useContext(AppointmentContext);
  if (!ctx) {
    throw new Error(
      'useAppointmentContext must be used within an AppointmentProvider',
    );
  }
  return ctx;
}
