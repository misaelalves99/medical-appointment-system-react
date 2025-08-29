// src/mocks/appointments.ts

export enum AppointmentStatus {
  Scheduled = 1,
  Confirmed = 2,
  Cancelled = 3,
}

export interface Appointment {
  id: number;
  patientId: number;
  patientName: string;
  doctorId: number;
  doctorName: string;
  appointmentDate: string; // ISO
  status: AppointmentStatus;
  notes: string;
}

// Mock inicial
export const appointmentsMock: Appointment[] = [
  {
    id: 1,
    patientId: 1,
    patientName: "João da Silva",
    doctorId: 2,
    doctorName: "Dra. Maria Oliveira",
    appointmentDate: "2025-08-15T14:30",
    status: AppointmentStatus.Confirmed,
    notes: "Paciente apresentou melhora significativa.",
  },
  {
    id: 2,
    patientId: 2,
    patientName: "Ana Pereira",
    doctorId: 1,
    doctorName: "Dr. Carlos Souza",
    appointmentDate: "2025-08-16T10:00",
    status: AppointmentStatus.Scheduled,
    notes: "Primeira consulta de rotina.",
  },
  {
    id: 3,
    patientId: 3,
    patientName: "Lucas Fernandes",
    doctorId: 3,
    doctorName: "Dra. Fernanda Lima",
    appointmentDate: "2025-08-17T16:00",
    status: AppointmentStatus.Cancelled,
    notes: "Consulta cancelada pelo paciente.",
  },
];
