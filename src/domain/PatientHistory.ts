// src/domain/PatientHistory.ts

import type { BaseEntity, ID } from './common';

export type PatientHistoryType =
  | 'CONSULTATION'
  | 'EXAM'
  | 'PROCEDURE'
  | 'NOTE';

export interface PatientHistoryItem extends BaseEntity {
  patientId: ID;
  doctorId?: ID;
  specialtyId?: ID;
  type: PatientHistoryType;

  /**
   * Data do evento (ISO).
   */
  date: string;

  /**
   * Descrição curta do evento.
   */
  description: string;

  /**
   * Observações adicionais.
   */
  notes?: string;

  /**
   * Quem lançou o registro (ex: "Dr. João", "Recepção").
   */
  createdBy?: string;

  /**
   * Origem do registro no sistema
   * (ex: "Recepção", "Integração externa", "Importação CSV").
   */
  source?: string;
}
