// src/domain/Patient.ts

import type { BaseEntity, Gender } from './common';
import type { PatientHistoryItem } from './PatientHistory';

export interface Patient extends BaseEntity {
  name: string;
  cpf: string;
  email: string;
  phone: string;
  birthDate: string; // ISO
  gender: Gender;
  address: string;
  avatarUrl?: string;

  /**
   * Campo livre para observações gerais sobre o paciente.
   */
  notes?: string;

  /**
   * Indica se o paciente está ativo na clínica.
   */
  isActive: boolean;

  /**
   * Histórico clínico / de atendimentos do paciente.
   */
  history?: PatientHistoryItem[];
}
