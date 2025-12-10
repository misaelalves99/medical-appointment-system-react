// src/theme/tokens/zIndex.ts

export const zIndex = {
  base: 0,
  below: -1,

  // Layout principal
  sidebar: 20,
  topbar: 30,
  pageHeader: 10,

  // Componentes flutuantes
  dropdown: 40,
  tooltip: 50,

  // Overlays
  overlay: 80,
  modal: 90,
  toast: 100,
} as const;

export type ZIndex = typeof zIndex;
