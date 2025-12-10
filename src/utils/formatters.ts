// src/utils/formatters.ts

/**
 * Remove tudo que não for dígito.
 */
function onlyDigits(value: string): string {
  return value.replace(/\D/g, '');
}

/**
 * Formata CPF no padrão 000.000.000-00
 */
export function formatCPF(value: string): string {
  const digits = onlyDigits(value).padStart(11, '0').slice(-11);

  return digits.replace(
    /^(\d{3})(\d{3})(\d{3})(\d{2})$/,
    '$1.$2.$3-$4',
  );
}

/**
 * Alias em camelCase para manter compatibilidade
 * com imports `formatCpf`.
 */
export const formatCpf = formatCPF;

/**
 * Formata telefone brasileiro simples:
 * - (DD) 00000-0000 ou (DD) 0000-0000
 */
export function formatPhone(value: string): string {
  const digits = onlyDigits(value);

  if (digits.length <= 10) {
    // fixo: DD + 8
    return digits.replace(
      /^(\d{0,2})(\d{0,4})(\d{0,4}).*$/,
      (_m, ddd, p1, p2) =>
        [ddd && `(${ddd}`, ddd && ') ', p1, p1 && '-', p2]
          .filter(Boolean)
          .join(''),
    );
  }

  // celular: DD + 9
  return digits.replace(
    /^(\d{0,2})(\d{0,5})(\d{0,4}).*$/,
    (_m, ddd, p1, p2) =>
      [ddd && `(${ddd}`, ddd && ') ', p1, p1 && '-', p2]
        .filter(Boolean)
        .join(''),
  );
}
