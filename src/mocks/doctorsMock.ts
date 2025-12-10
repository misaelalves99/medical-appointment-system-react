// src/mocks/doctorsMock.ts

import type { Doctor } from '../domain/Doctor';
import type { DoctorAvailability } from '../domain/DoctorAvailability';

const availabilityTemplate: DoctorAvailability[] = [
  {
    id: 'av-1',
    doctorId: 'doc-1',
    dayOfWeek: 'MONDAY',
    startTime: '08:00',
    endTime: '12:00',
    isAvailable: true,
  },
  {
    id: 'av-2',
    doctorId: 'doc-1',
    dayOfWeek: 'WEDNESDAY',
    startTime: '14:00',
    endTime: '18:00',
    isAvailable: true,
  },
];

export const doctorsMock: Doctor[] = [
  {
    id: 'doc-1',
    name: 'Dr. Ana Silva',
    crm: 'CRM-12345',
    specialtyId: 'spec-1',
    phone: '(31) 99999-0001',
    email: 'ana.silva@clinic.com',
    avatarUrl: '',
    bio: 'Cardiologista com foco em prevenção e acompanhamento contínuo.',
    isActive: true,
    availability: availabilityTemplate,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'doc-2',
    name: 'Dr. João Pereira',
    crm: 'CRM-67890',
    specialtyId: 'spec-2',
    phone: '(31) 98888-1111',
    email: 'joao.pereira@clinic.com',
    avatarUrl: '',
    bio: 'Clínico geral com experiência em atendimento ambulatorial.',
    isActive: true,
    availability: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];
