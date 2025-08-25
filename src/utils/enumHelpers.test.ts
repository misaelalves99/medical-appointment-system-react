// src/utils/enumHelpers.test.ts

import { getAppointmentStatusLabel } from './enumHelpers';
import { AppointmentStatus } from '../types/Appointment';

describe('getAppointmentStatusLabel', () => {
  it('deve retornar "Agendada" para Scheduled', () => {
    expect(getAppointmentStatusLabel(AppointmentStatus.Scheduled)).toBe('Agendada');
  });

  it('deve retornar "Confirmada" para Confirmed', () => {
    expect(getAppointmentStatusLabel(AppointmentStatus.Confirmed)).toBe('Confirmada');
  });

  it('deve retornar "Cancelada" para Cancelled', () => {
    expect(getAppointmentStatusLabel(AppointmentStatus.Cancelled)).toBe('Cancelada');
  });

  it('deve retornar "Concluída" para Completed', () => {
    expect(getAppointmentStatusLabel(AppointmentStatus.Completed)).toBe('Concluída');
  });

  it('deve retornar string do valor desconhecido para valores fora do enum', () => {
    // Convertendo de string para unknown e depois para AppointmentStatus
    const unknownStatus = 'OutroValor' as unknown as AppointmentStatus;
    expect(getAppointmentStatusLabel(unknownStatus)).toBe('OutroValor');
  });
});
