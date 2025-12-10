// src/theme/tokens/typography.ts

type FontScale = {
  fontSize: string;
  lineHeight: string;
  letterSpacing?: string;
  fontWeight: number;
};

export const typography = {
  fontFamily: {
    base: `'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`,
    mono: `'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace`,
  },

  heading: {
    // Títulos principais de página
    xl: {
      fontSize: '1.75rem',
      lineHeight: '1.2',
      letterSpacing: '-0.04em',
      fontWeight: 700,
    } satisfies FontScale,
    lg: {
      fontSize: '1.5rem',
      lineHeight: '1.25',
      letterSpacing: '-0.03em',
      fontWeight: 600,
    } satisfies FontScale,
    md: {
      fontSize: '1.25rem',
      lineHeight: '1.3',
      letterSpacing: '-0.02em',
      fontWeight: 600,
    } satisfies FontScale,
    sm: {
      fontSize: '1.125rem',
      lineHeight: '1.35',
      fontWeight: 600,
    } satisfies FontScale,
  },

  text: {
    // Corpo principal
    md: {
      fontSize: '0.95rem',
      lineHeight: '1.6',
      fontWeight: 400,
    } satisfies FontScale,
    sm: {
      fontSize: '0.875rem',
      lineHeight: '1.6',
      fontWeight: 400,
    } satisfies FontScale,
    xs: {
      fontSize: '0.75rem',
      lineHeight: '1.5',
      fontWeight: 400,
    } satisfies FontScale,
  },

  ui: {
    // Labels de formulário, badges, etc.
    label: {
      fontSize: '0.75rem',
      lineHeight: '1.4',
      letterSpacing: '0.03em',
      fontWeight: 600,
    } satisfies FontScale,
    badge: {
      fontSize: '0.7rem',
      lineHeight: '1.4',
      letterSpacing: '0.06em',
      fontWeight: 600,
    } satisfies FontScale,
    button: {
      fontSize: '0.85rem',
      lineHeight: '1.4',
      letterSpacing: '0.04em',
      fontWeight: 600,
    } satisfies FontScale,
  },
} as const;

export type Typography = typeof typography;
