// src/utils/validation.ts

let idCounter = 0;

/**
 * Gera um ID simples para mocks de front.
 * Ex.: "id-1-1699999999999" ou "appt-2-1699999999999"
 */
export function generateId(prefix = ''): string {
  idCounter += 1;
  return `${prefix || 'id'}-${idCounter}-${Date.now()}`;
}

export function isEmail(value: string): boolean {
  if (!value) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

// Validação simples, apenas para front mockado
export function isCPF(value: string): boolean {
  const digits = value.replace(/\D/g, '');
  return digits.length === 11;
}

export interface FieldError {
  field: string;
  message: string;
}

/**
 * Validação genérica de campo obrigatório.
 */
export function required(
  value: string,
  fieldLabel: string,
): FieldError | null {
  if (!value?.trim()) {
    return { field: fieldLabel, message: `${fieldLabel} é obrigatório.` };
  }
  return null;
}
