// src/utils/dateUtils.ts

export function formatDate(iso: string | null | undefined): string {
  if (!iso) return '';
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return '';
  return date.toLocaleDateString('pt-BR');
}

export function formatTime(iso: string | null | undefined): string {
  if (!iso) return '';
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return '';
  return date.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function formatDateTime(iso: string | null | undefined): string {
  if (!iso) return '';
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return '';
  return `${formatDate(iso)} • ${formatTime(iso)}`;
}

/**
 * Alias usado nas telas de consultas (lista, detalhes, delete, cancel, etc.).
 * Mantém compatibilidade com imports `formatDateTimeShort`.
 */
export function formatDateTimeShort(
  iso: string | null | undefined,
): string {
  return formatDateTime(iso);
}

/**
 * Compara se dois instantes caem no MESMO dia de calendário (YYYY-MM-DD),
 * ignorando horário.
 */
export function isSameDay(
  a: string | Date | null | undefined,
  b: string | Date | null | undefined,
): boolean {
  if (!a || !b) return false;

  const da = typeof a === 'string' ? new Date(a) : a;
  const db = typeof b === 'string' ? new Date(b) : b;

  if (Number.isNaN(da.getTime()) || Number.isNaN(db.getTime())) return false;

  return (
    da.getFullYear() === db.getFullYear() &&
    da.getMonth() === db.getMonth() &&
    da.getDate() === db.getDate()
  );
}

/**
 * Converte ISO (UTC) para valor compatível com <input type="datetime-local">
 */
export function toInputDateTimeLocal(
  iso: string | null | undefined,
): string {
  if (!iso) return '';
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return '';
  const off = date.getTimezoneOffset();
  const local = new Date(date.getTime() - off * 60 * 1000);
  return local.toISOString().slice(0, 16); // yyyy-MM-ddTHH:mm
}

/**
 * Converte valor de <input type="datetime-local"> (timezone local)
 * para ISO em UTC.
 */
export function fromInputDateTimeLocal(value: string): string {
  if (!value) return '';
  const date = new Date(value);
  return date.toISOString();
}

export function getTodayISO(): string {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d.toISOString();
}
