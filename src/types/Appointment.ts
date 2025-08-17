// src/types/Appointment.ts

export enum AppointmentStatus {
  Scheduled = 0,
  Confirmed = 1,
  Cancelled = 2,
  Completed = 3,
}

export interface Appointment {
  id: number;
  patientId: number;
  patientName?: string;
  doctorId: number;
  doctorName?: string;
  appointmentDate: string; // ISO string
  status: AppointmentStatus;
  notes?: string;
}

// Tipo específico para o formulário de criação/edição
export interface AppointmentFormState {
  patientId: number;
  patientName: string;
  doctorId: number;
  doctorName: string;
  appointmentDate: string; // formato datetime-local
  status: AppointmentStatus;
  notes?: string;
}
