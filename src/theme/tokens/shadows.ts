// src/theme/tokens/shadows.ts

export const shadows = {
  none: 'none',

  // Cards principais do dashboard
  cardSoft:
    '0 18px 40px rgba(15, 23, 42, 0.45), 0 0 0 1px rgba(15, 23, 42, 0.8)',
  cardSubtle: '0 10px 30px rgba(15, 23, 42, 0.6)',

  // Topbar, sidebar “flutuando”
  shell:
    '0 16px 40px rgba(15, 23, 42, 0.7), 0 0 0 1px rgba(15, 23, 42, 0.85)',

  // Elementos de foco / hover
  focusSoft: '0 0 0 1px rgba(34, 197, 94, 0.35)',
  focusStrong: '0 0 0 1px rgba(34, 197, 94, 0.7)',

  // Modais
  modal:
    '0 22px 60px rgba(15, 23, 42, 0.9), 0 0 0 1px rgba(15, 23, 42, 0.9)',

  // Botões principais
  button:
    '0 12px 30px rgba(34, 197, 94, 0.4), 0 0 0 1px rgba(21, 128, 61, 0.6)',
} as const;

export type Shadows = typeof shadows;
