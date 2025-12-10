// src/mocks/specialtiesMock.ts

import type { Specialty } from '../domain/Specialty';

const now = new Date().toISOString();

export const specialtiesMock: Specialty[] = [
  {
    id: 'spec-1',
    name: 'Clínico Geral',
    description: 'Atendimento geral e triagem inicial de pacientes.',
    isActive: true,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'spec-2',
    name: 'Cardiologia',
    description: 'Avaliação e acompanhamento de pacientes cardíacos.',
    isActive: true,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'spec-3',
    name: 'Pediatria',
    description: 'Atendimento especializado em crianças.',
    isActive: true,
    createdAt: now,
    updatedAt: now,
  },
];
