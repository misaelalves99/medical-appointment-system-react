// src/app/router/routes.tsx

export type AppRouteCategory = 'dashboard' | 'auth' | 'public';

export interface AppRouteMeta {
  id: string;
  path: string;
  label: string;
  category: AppRouteCategory;
  showInSidebar?: boolean;
  section?: 'main' | 'management' | 'other';
}

/**
 * Mapa central de rotas + metadados.
 * Pode ser usado por Sidebar, breadcrumbs, analytics, etc.
 */
export const appRoutesMeta: AppRouteMeta[] = [
  // Dashboard
  {
    id: 'dashboard-home',
    path: '/dashboard',
    label: 'Visão geral',
    category: 'dashboard',
    showInSidebar: true,
    section: 'main',
  },

  // Consultas
  {
    id: 'appointments-list',
    path: '/appointments',
    label: 'Consultas',
    category: 'dashboard',
    showInSidebar: true,
    section: 'main',
  },
  {
    id: 'appointments-create',
    path: '/appointments/create',
    label: 'Agendar consulta',
    category: 'dashboard',
  },
  {
    id: 'appointments-edit',
    path: '/appointments/edit/:id',
    label: 'Editar consulta',
    category: 'dashboard',
  },
  {
    id: 'appointments-details',
    path: '/appointments/details/:id',
    label: 'Detalhes da consulta',
    category: 'dashboard',
  },
  {
    id: 'appointments-cancel',
    path: '/appointments/cancel/:id',
    label: 'Cancelar consulta',
    category: 'dashboard',
  },
  {
    id: 'appointments-confirm',
    path: '/appointments/confirm/:id',
    label: 'Confirmar consulta',
    category: 'dashboard',
  },
  {
    id: 'appointments-delete',
    path: '/appointments/delete/:id',
    label: 'Excluir consulta',
    category: 'dashboard',
  },
  {
    id: 'appointments-calendar',
    path: '/appointments/calendar',
    label: 'Agenda de consultas',
    category: 'dashboard',
    showInSidebar: false,
    section: 'management',
  },

  // Pacientes
  {
    id: 'patients-list',
    path: '/patients',
    label: 'Pacientes',
    category: 'dashboard',
    showInSidebar: true,
    section: 'management',
  },
  {
    id: 'patients-create',
    path: '/patients/create',
    label: 'Novo paciente',
    category: 'dashboard',
  },
  {
    id: 'patients-edit',
    path: '/patients/edit/:id',
    label: 'Editar paciente',
    category: 'dashboard',
  },
  {
    id: 'patients-details',
    path: '/patients/details/:id',
    label: 'Ficha do paciente',
    category: 'dashboard',
  },
  {
    id: 'patients-delete',
    path: '/patients/delete/:id',
    label: 'Excluir paciente',
    category: 'dashboard',
  },
  {
    id: 'patients-history',
    path: '/patients/history/:id',
    label: 'Histórico do paciente',
    category: 'dashboard',
  },
  {
    id: 'patients-upload-picture',
    path: '/patients/upload-profile-picture/:id',
    label: 'Foto do paciente',
    category: 'dashboard',
  },

  // Médicos
  {
    id: 'doctors-list',
    path: '/doctors',
    label: 'Médicos',
    category: 'dashboard',
    showInSidebar: true,
    section: 'management',
  },
  {
    id: 'doctors-create',
    path: '/doctors/create',
    label: 'Novo médico',
    category: 'dashboard',
  },
  {
    id: 'doctors-edit',
    path: '/doctors/edit/:id',
    label: 'Editar médico',
    category: 'dashboard',
  },
  {
    id: 'doctors-details',
    path: '/doctors/details/:id',
    label: 'Detalhes do médico',
    category: 'dashboard',
  },
  {
    id: 'doctors-delete',
    path: '/doctors/delete/:id',
    label: 'Excluir médico',
    category: 'dashboard',
  },

  // Especialidades
  {
    id: 'specialties-list',
    path: '/specialties',
    label: 'Especialidades',
    category: 'dashboard',
    showInSidebar: true,
    section: 'management',
  },
  {
    id: 'specialties-create',
    path: '/specialties/create',
    label: 'Nova especialidade',
    category: 'dashboard',
  },
  {
    id: 'specialties-edit',
    path: '/specialties/edit/:id',
    label: 'Editar especialidade',
    category: 'dashboard',
  },
  {
    id: 'specialties-details',
    path: '/specialties/details/:id',
    label: 'Detalhes da especialidade',
    category: 'dashboard',
  },
  {
    id: 'specialties-delete',
    path: '/specialties/delete/:id',
    label: 'Excluir especialidade',
    category: 'dashboard',
  },

  // Disponibilidade médica
  {
    id: 'doctor-availability',
    path: '/doctor-availability',
    label: 'Disponibilidade médica',
    category: 'dashboard',
    showInSidebar: true,
    section: 'management',
  },

  // Autenticação
  {
    id: 'auth-login',
    path: '/login',
    label: 'Entrar',
    category: 'auth',
  },
  {
    id: 'auth-register',
    path: '/register',
    label: 'Criar conta',
    category: 'auth',
  },

  // Público
  {
    id: 'public-home',
    path: '/home',
    label: 'Home',
    category: 'public',
  },
  {
    id: 'public-error',
    path: '/error',
    label: 'Erro',
    category: 'public',
  },
];

export const sidebarRoutesMeta: AppRouteMeta[] = appRoutesMeta.filter(
  (route) => route.category === 'dashboard' && route.showInSidebar,
);
