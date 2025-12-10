// src/theme/tokens/colors.ts

export const colors = {
  // Fundo geral do app (dashboard)
  background: {
    app: '#020617', // corpo da aplicação
    surface: '#020617', // fundo padrão
    surfaceElevated: '#020817', // cards, modais
    surfaceSubtle: '#0b1120', // seções internas
  },

  // Sidebar e topbar
  shell: {
    sidebarBg: '#020617',
    sidebarBorder: '#1e293b',
    sidebarActiveBg: '#0f172a',
    sidebarActiveBorder: '#22c55e',
    topbarBg: '#020617',
    topbarBorder: '#1e293b',
  },

  // Marca / Ação principal
  brand: {
    primary: '#22c55e',
    primarySoft: 'rgba(34, 197, 94, 0.12)',
    primaryStrong: '#16a34a',
    primaryBorder: 'rgba(34, 197, 94, 0.4)',
  },

  // Ações secundárias
  accent: {
    blue: '#38bdf8',
    blueSoft: 'rgba(56, 189, 248, 0.12)',
    purple: '#a855f7',
    purpleSoft: 'rgba(168, 85, 247, 0.12)',
  },

  // Texto
  text: {
    primary: '#e5e7eb',
    secondary: '#9ca3af',
    muted: '#6b7280',
    onPrimary: '#020617',
    onDanger: '#f9fafb',
  },

  // Bordas
  border: {
    subtle: '#1f2937',
    strong: '#374151',
    focus: '#22c55e',
    danger: '#f97373',
  },

  // Estados (sucesso, erro, etc.)
  status: {
    successBg: 'rgba(34, 197, 94, 0.12)',
    successBorder: 'rgba(34, 197, 94, 0.5)',
    successText: '#4ade80',

    dangerBg: 'rgba(248, 113, 113, 0.12)',
    dangerBorder: 'rgba(248, 113, 113, 0.5)',
    dangerText: '#fca5a5',

    warningBg: 'rgba(250, 204, 21, 0.12)',
    warningBorder: 'rgba(250, 204, 21, 0.5)',
    warningText: '#facc15',

    infoBg: 'rgba(56, 189, 248, 0.12)',
    infoBorder: 'rgba(56, 189, 248, 0.5)',
    infoText: '#7dd3fc',
  },

  // Badges / tags de status de consulta
  appointmentStatus: {
    scheduledBg: 'rgba(56, 189, 248, 0.12)',
    scheduledText: '#38bdf8',

    confirmedBg: 'rgba(34, 197, 94, 0.12)',
    confirmedText: '#22c55e',

    cancelledBg: 'rgba(248, 113, 113, 0.12)',
    cancelledText: '#f97373',

    finishedBg: 'rgba(168, 85, 247, 0.12)',
    finishedText: '#a855f7',
  },

  // Miscelânea
  overlay: {
    scrim: 'rgba(15, 23, 42, 0.65)', // fundo de modal
  },
} as const;

export type Colors = typeof colors;
