// src/domain/Specialty.ts

import type { BaseEntity } from './common';

export interface Specialty extends BaseEntity {
  name: string;
  description?: string;

  /**
   * Indica se a especialidade está ativa na clínica.
   */
  isActive: boolean;
}
