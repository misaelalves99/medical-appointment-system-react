// src/theme/index.ts

import { colors } from './tokens/colors';
import { spacing } from './tokens/spacing';
import { typography } from './tokens/typography';
import { radii } from './tokens/radii';
import { shadows } from './tokens/shadows';
import { zIndex } from './tokens/zIndex';

export const theme = {
  colors,
  spacing,
  typography,
  radii,
  shadows,
  zIndex,
} as const;

export type AppTheme = typeof theme;

// Re-exports para importar tokens específicos quando precisar
export * from './tokens/colors';
export * from './tokens/spacing';
export * from './tokens/typography';
export * from './tokens/radii';
export * from './tokens/shadows';
export * from './tokens/zIndex';
