// src/theme/tokens/spacing.ts

export const spacing = {
  // Escala base em rem (1rem = 16px)
  none: '0',
  xxs: '0.125rem', // 2px
  xs: '0.25rem', // 4px
  sm: '0.5rem', // 8px
  md: '0.75rem', // 12px
  lg: '1rem', // 16px
  xl: '1.5rem', // 24px
  '2xl': '2rem', // 32px
  '3xl': '3rem', // 48px

  // Layouts específicos
  layout: {
    pagePaddingX: '1.5rem',
    pagePaddingY: '1.5rem',
    cardPadding: '1.25rem',
    sectionGap: '1.5rem',
    formGap: '1rem',
  },

  // Gaps para grids de dashboard
  grid: {
    sm: '0.75rem',
    md: '1rem',
    lg: '1.5rem',
  },
} as const;

export type Spacing = typeof spacing;
