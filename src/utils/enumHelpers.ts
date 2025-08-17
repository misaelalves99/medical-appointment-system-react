// src/utils/enumHelpers.ts

import { AppointmentStatus } from '../types/Appointment';

export function getAppointmentStatusLabel(status: AppointmentStatus): string {
  switch (status) {
    case AppointmentStatus.Scheduled: return 'Agendada';
    case AppointmentStatus.Confirmed: return 'Confirmada';
    case AppointmentStatus.Cancelled: return 'Cancelada';
    case AppointmentStatus.Completed: return 'Concluída';
    default: return String(status);
  }
}
