// src/mocks/appointmentsMock.ts

import type { Appointment } from '../domain/Appointment';

const base = new Date();

function addHours(hours: number) {
  const d = new Date(base);
  d.setHours(d.getHours() + hours);
  return d.toISOString();
}

export const appointmentsMock: Appointment[] = [
  {
    id: 'appt-1',
    patientId: 'pat-1',
    doctorId: 'doc-1',
    specialtyId: 'spec-1',
    dateTime: addHours(2),
    status: 'SCHEDULED',
    notes: 'Primeira consulta do ano.',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'appt-2',
    patientId: 'pat-2',
    doctorId: 'doc-2',
    specialtyId: 'spec-2',
    dateTime: addHours(24),
    status: 'CONFIRMED',
    notes: 'Retorno para avaliação de exames.',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];
