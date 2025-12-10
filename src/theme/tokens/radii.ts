// src/theme/tokens/radii.ts

export const radii = {
  none: '0',
  xs: '0.125rem', // 2px
  sm: '0.25rem', // 4px
  md: '0.5rem', // 8px
  lg: '0.75rem', // 12px
  xl: '1rem', // 16px
  full: '999px',

  // Casos específicos de UI
  card: '0.75rem',
  input: '0.5rem',
  button: '999px', // pills
  badge: '999px',
  avatar: '999px',
  modal: '1rem',
} as const;

export type Radii = typeof radii;
