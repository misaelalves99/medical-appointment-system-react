// src/mocks/appointments.ts

import { Appointment, AppointmentStatus } from "../types/Appointment";

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
];
