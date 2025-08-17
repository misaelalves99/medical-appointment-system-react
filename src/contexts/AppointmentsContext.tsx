// src/contexts/AppointmentsContext.tsx

import { createContext } from 'react';
import type { Appointment } from '../types/Appointment';

export interface AppointmentsContextType {
  appointments: Appointment[];
  addAppointment: (appointment: Omit<Appointment, 'id'>) => void; // id será gerado
  updateAppointment: (appointment: Appointment) => void;
  deleteAppointment: (id: number) => void;
  confirmAppointment: (id: number) => void;
  cancelAppointment: (id: number) => void;
}

export const AppointmentsContext = createContext<AppointmentsContextType>({
  appointments: [],
  addAppointment: () => {},
  updateAppointment: () => {},
  deleteAppointment: () => {},
  confirmAppointment: () => {},
  cancelAppointment: () => {},
});
