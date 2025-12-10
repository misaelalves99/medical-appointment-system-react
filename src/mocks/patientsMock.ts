// src/mocks/patientsMock.ts

import type { Patient } from '../domain/Patient';
import type { PatientHistoryItem } from '../domain/PatientHistory';

const now = new Date();

const historySample: PatientHistoryItem[] = [
  {
    id: 'hist-1',
    patientId: 'pat-1',
    doctorId: 'doc-1',
    specialtyId: 'spec-1',
    type: 'CONSULTATION',
    date: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    description: 'Consulta de rotina',
    notes: 'Paciente estável, retorno em 6 meses.',
    createdBy: 'Dr. Ana Silva',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const patientsMock: Patient[] = [
  {
    id: 'pat-1',
    name: 'Maria Souza',
    cpf: '12345678900',
    email: 'maria.souza@example.com',
    phone: '(31) 90000-0001',
    birthDate: '1990-05-10',
    gender: 'FEMALE',
    address: 'Rua das Flores, 123 - Centro',
    avatarUrl: '',
    notes: 'Paciente com histórico de consultas regulares.',
    isActive: true,
    history: historySample,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'pat-2',
    name: 'Carlos Pereira',
    cpf: '98765432100',
    email: 'carlos.pereira@example.com',
    phone: '(31) 98888-2222',
    birthDate: '1985-09-22',
    gender: 'MALE',
    address: 'Av. Brasil, 456 - Bairro Novo',
    avatarUrl: '',
    notes: 'Paciente novo na clínica.',
    isActive: true,
    history: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];
