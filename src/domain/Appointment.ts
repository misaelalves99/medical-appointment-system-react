// src/domain/Appointment.ts

import type { BaseEntity, ID } from './common';

export type AppointmentStatus =
  | 'SCHEDULED'
  | 'CONFIRMED'
  | 'CANCELLED'
  | 'COMPLETED'
  | 'NO_SHOW';

export interface Appointment extends BaseEntity {
  patientId: ID;
  doctorId: ID;
  specialtyId?: ID;
  dateTime: string; // ISO
  status: AppointmentStatus;
  notes?: string;

  // Campos “denormalizados” para exibição
  patientName?: string;
  doctorName?: string;
  specialtyName?: string;
  room?: string;
}
