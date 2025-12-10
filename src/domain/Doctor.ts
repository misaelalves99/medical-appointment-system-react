// src/domain/Doctor.ts

import type { DoctorAvailability } from './DoctorAvailability';

export interface Doctor {
  id: string | number;
  name: string;
  crm: string;
  specialtyId: string | number;
  phone?: string;
  email?: string;
  avatarUrl?: string;
  /** texto de apresentação do médico */
  bio?: string;
  /** se o médico está ativo na clínica */
  isActive?: boolean;
  availability: DoctorAvailability[];
  createdAt: string;
  updatedAt: string;
}
